from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import base64

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from googletrans import Translator
import speech_recognition as sr
import gtts

app = Flask(__name__)
CORS(app)

MONGODB_URI = "mongodb+srv://22pa5a1211:db123@cluster0.cy64wo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGODB_URI)
db = client.get_database("mydatabase") 
collection1 = db.users
collection2 = db.checklist
collection3 = db.reviews

@app.route('/')
def testing():
    res = collection2.find({"userID": "6638d5803e9740a500980a45"})
    # print([doc for doc in res])
    docs = [
        {**doc, "_id": str(doc["_id"])}  # Convert ObjectId to string
        for doc in res
    ]
    return jsonify(docs)

@app.route("/signupsubmit", methods=['POST'])
def signup():
    data = request.json
    if(collection1.find_one({'user_email':data.get('user_email')})):
        return "User Already Exists..!"
    else:
        collection1.insert_one(data)
        return "SignUp Successfully..!, Please Login"
    
@app.route("/loginsubmit", methods=['POST'])
def login():
    data = request.json
    db_data = collection1.find_one({'user_email': data.get('user_email')})
    if(db_data and db_data.get('user_email') == data.get("user_email")):
        if(db_data.get('password') == data.get('password')):
            username = db_data.get('first_name') + " " + db_data.get('last_name')
            userid = str(db_data.get('_id'))
            return jsonify({"user_name": username,"user_id": userid,"status": True})
        else:
            return jsonify({"status": False, "err_msg": "Incorrect Paswword..! Please Enter Correct Password."})
    else:
        return jsonify({"status": False, "err_msg": "User dosn't exists..! Please SignUp."})


df = pd.read_csv("Indian_Places_to_Visit.csv")
df.to_csv("Indian_Places_to_Visit.csv", index=None)

data = df[['Zone','State','City','Name','Type','Significance','Best_Time_to_visit','Google_review_rating']].copy()
data['features'] = data['Type'] + ' ' + data['Significance']+' '+ data['City']+' '+ data['State']+ ' ' + ' ' + data['Best_Time_to_visit']

# TF-IDF vectorization
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(data['features'])

@app.route('/recommend', methods=['POST'])
def recommend_destinations():
    user_interests = request.json.get('user_interests', "")
    num_recommendations = request.json.get('num_recommendations')

    if not user_interests:
        return jsonify({"error": "User interests are required"}), 400

     # Transform user interests into TF-IDF vector
    user_vector = tfidf_vectorizer.transform([user_interests])

    # Calculate cosine similarity between user interests vector and destination vectors
    cosine_similarities = linear_kernel(user_vector, tfidf_matrix).flatten()

    # Get indices of top recommendations
    top_indices = cosine_similarities.argsort()[:-int(num_recommendations)-1:-1]

    # Recommend destinations
    recommendations = df.iloc[top_indices][['State', 'City', 'Name', 'Type', 'Significance','Best_Time_to_visit','Google_review_rating']].to_dict(orient='records')
    return jsonify({"recommendations": recommendations})
    # return { recommendations}

@app.route("/translate", methods = ['POST'])
def translate():
    user_text = request.json.get('user_text')
    dest_text_lang= request.json.get('text_language')

    translator = Translator()
    translated = translator.translate(text=user_text, dest=dest_text_lang)

    print(translated.text)

    return jsonify({"traslated_text": translated.text})

@app.route('/speechtranslate', methods=['POST'])
def speechtranslate():
    recognizer = sr.Recognizer()
    
    # Get audio data from request
    audio_data = request.data
    
    # Convert audio data to text
    with sr.AudioData(audio_data, 16000) as source:
        try:
            text = recognizer.recognize_google(source, language='en')
        except sr.UnknownValueError:
            text = "Could not understand audio"
        except sr.RequestError:
            text = "API unavailable"
    
    # Translate text to Telugu
    translator = Translator()
    translated = translator.translate(text, dest="te")
    
    # Convert translated text to speech
    converted_audio = gtts.gTTS(translated.text, lang="te")
    converted_audio.save("translated_output.mp3")
    
    return jsonify({'translated_text': translated.text})

@app.route("/store/checklist", methods=['POST'])
def storeChecklist():
    data = request.json
    res = db.checklist.insert_one(data)
    return "One checklist Inserted"

@app.route("/retrieve/checklist/<string:userid>")
def retrieve_data(userid):
    res = collection2.find({"userID": userid})
    docs = [
        {**doc, "_id": str(doc["_id"])}  # Convert ObjectId to string
        for doc in res
    ]
    return jsonify(docs)

@app.route('/delete/checklist/<string:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    try:
        # Convert the todo_id to ObjectId
        obj_id = ObjectId(todo_id)
        
        # Delete the todo item from the collection
        result = collection2.delete_one({'_id': obj_id})
        
        if result.deleted_count == 1:
            return jsonify({'message': 'Todo item deleted successfully'}), 200
        else:
            return jsonify({'message': 'Todo item not found'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/update/checklist/<string:todo_id>', methods=['PUT'])
def update_todo_status(todo_id):
    try:
        # Convert the todo_id to ObjectId
        obj_id = ObjectId(todo_id)
        
        # Get the existing todo item from the collection
        todo_item = collection2.find_one({'_id': obj_id})
        if not todo_item:
            return jsonify({'message': 'Todo item not found'}), 404
        
        # Toggle the status of the todo item
        new_status = not todo_item.get('status', False)  # Toggle status
        
        # Update the status of the todo item in the collection
        result = collection2.update_one({'_id': obj_id}, {'$set': {'status': new_status}})
        
        if result.modified_count == 1:
            return jsonify({'message': 'Todo item status updated successfully'}), 200
        else:
            return jsonify({'message': 'Failed to update todo item status'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']
        place = request.form.get('place')
        city = request.form.get('city')
        state = request.form.get('state')
        review = request.form.get('review')
        username = request.form.get('username')
        collection3.insert_one({'image': image.read(), 'place': place, 'city': city, 'state': state, 'review': review, 'user_name': username})
        return jsonify({'message': 'Image uploaded successfully'})
    else:
        return jsonify({'error': 'No image found'})
    
@app.route('/images', methods=['GET'])
def get_images():
    res = collection3.find({})
    docs = [
        {
            "_id": str(doc["_id"]),  # Convert ObjectId to string
            "image": base64.b64encode(doc["image"]).decode('utf-8'),
            "place": doc.get("place", ""),
            "city": doc.get("city", ""),
            "state": doc.get("state", ""),
            "review": doc.get("review", ""),
            "username": doc.get("user_name", "") 
        }
        for doc in res
    ]
    return jsonify(docs)


if __name__ == "__main__":
    app.run(debug=True)
