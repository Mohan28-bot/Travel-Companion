from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from googletrans import Translator
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app)

# MongoDB Connection
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client["Travel_World"]

# Translator instance
translator = Translator()

# ------------------- USER AUTH -------------------
@app.route("/signupsubmit", methods=["POST"])
def signup():
    try:
        data = request.json
        user_name = data.get("user_name")
        user_email = data.get("user_email")
        password = data.get("password")

        if db.users.find_one({"user_email": user_email}):
            return jsonify({"status": False, "err_msg": "Email already exists"})

        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        result = db.users.insert_one({
            "user_name": user_name,
            "user_email": user_email,
            "password": hashed_pw
        })
        return jsonify({"status": True, "user_id": str(result.inserted_id)})
    except Exception as e:
        return jsonify({"status": False, "err_msg": str(e)})

@app.route("/loginsubmit", methods=["POST"])
def login():
    try:
        data = request.json
        user_email = data.get("user_email")
        password = data.get("password")

        user = db.users.find_one({"user_email": user_email})
        if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            return jsonify({
                "status": True,
                "user_id": str(user["_id"]),
                "user_name": user["user_name"]
            })
        return jsonify({"status": False, "err_msg": "Invalid credentials"})
    except Exception as e:
        return jsonify({"status": False, "err_msg": str(e)})

# ------------------- TRAVEL RECOMMEND -------------------
@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json
        user_input = data.get("user_input", "")

        df = pd.read_csv("Indian_Places_to_Visit.csv")
        tfidf = TfidfVectorizer(stop_words="english")
        tfidf_matrix = tfidf.fit_transform(df["Place_Description"].astype(str))
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

        idx = df[df["Place_Name"].str.contains(user_input, case=False, na=False)].index
        if len(idx) == 0:
            return jsonify({"recommendations": []})

        idx = idx[0]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:6]

        place_indices = [i[0] for i in sim_scores]
        results = df.iloc[place_indices][["Place_Name", "Place_Description"]].to_dict(orient="records")

        return jsonify({"recommendations": results})
    except Exception as e:
        return jsonify({"error": str(e)})

# ------------------- CHECKLIST -------------------
@app.route("/store/checklist", methods=["POST"])
def store_checklist():
    try:
        data = request.json
        user_id = data.get("user_id")
        item = data.get("item")

        db.checklist.insert_one({"user_id": user_id, "item": item})
        return jsonify({"status": True})
    except Exception as e:
        return jsonify({"status": False, "error": str(e)})

@app.route("/retrieve/checklist/<user_id>", methods=["GET"])
def retrieve_checklist(user_id):
    try:
        items = list(db.checklist.find({"user_id": user_id}))
        for item in items:
            item["_id"] = str(item["_id"])
        return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/delete/checklist/<item_id>", methods=["DELETE"])
def delete_checklist(item_id):
    try:
        db.checklist.delete_one({"_id": ObjectId(item_id)})
        return jsonify({"status": True})
    except Exception as e:
        return jsonify({"status": False, "error": str(e)})

# ------------------- TRANSLATE -------------------
@app.route("/translate", methods=["POST"])
def translate_text():
    try:
        data = request.json
        user_text = data.get("user_text")
        text_language = data.get("text_language", "en")

        translated = translator.translate(user_text, dest=text_language)
        return jsonify({"traslated_text": translated.text})
    except Exception as e:
        return jsonify({"error": str(e)})

# ------------------- SPEECH TRANSLATE -------------------
@app.route("/speechtranslate", methods=["POST"])
def speech_translate():
    try:
        data = request.json
        text = data.get("text")
        target_lang = data.get("target_lang", "en")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        translated = translator.translate(text, dest=target_lang)
        translated_text = translated.text

        audio_file = "translated_output.mp3"
        tts = gTTS(translated_text, lang=target_lang)
        tts.save(audio_file)

        return jsonify({
            "translated_text": translated_text,
            "audio_file": f"/{audio_file}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/translated_output.mp3")
def get_audio():
    return send_from_directory(os.getcwd(), "translated_output.mp3")

# ------------------- RUN -------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
