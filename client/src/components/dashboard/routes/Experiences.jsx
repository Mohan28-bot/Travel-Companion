import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPen, FaUser } from "react-icons/fa";

function Experiences() {
  const { username } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  const [image, setImage] = useState(null);
  const [docs, setDocs] = useState([]);

  const [placename, setPlaceName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [review, setReview] = useState("");

  const [selectedState, setSelectedState] = useState("all");

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    await axios
      .get("http://localhost:5000/images")
      .then((res) => {
        setDocs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (placename && city && state && review && image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("place", placename);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("review", review);
      formData.append("username", username);

      axios
        .post("http://localhost:5000/upload", formData)
        .then((res) => {
          console.log(res.data.message);
          fetchImages();
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
        });

      toggleVisibility();

      setCity("");
      setImage("");
      setPlaceName("");
      setReview("");
      setState("");
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const filteredDocs =
    selectedState === "all"
      ? docs
      : docs.filter((doc) => doc.state === selectedState);
  const noReviewsFound = selectedState !== "all" && filteredDocs.length === 0;
  return (
    <div className="review_container">
      <h1>People Experiences</h1>
      <div className="post_bt">
        <p>Post your trip Experiences</p>
        <div className="filter_con">
          <button onClick={toggleVisibility}>
            Post <FaPen />
          </button>
          <label>
            <span>Filter by State</span>
            <select onChange={handleStateChange}>
              <option value="all">All</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </label>
        </div>
      </div>
      {isVisible && (
        <div className="popup_con">
          <div className="form_con">
            <div className="form">
              <h2>Create Post</h2>
              <input
                type="text"
                placeholder="Place name"
                onChange={(e) => setPlaceName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <select onChange={(e) => setState(e.target.value)} required>
                <option value="">Select state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
              <textarea
                placeholder="Describe your experience..."
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
              <input
                id="fileInput"
                type="file"
                onChange={handleImageChange}
                required
              />
              <div className="form_bts">
                <button onClick={toggleVisibility}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="review_output">
        {noReviewsFound && (
          <p id="err">No reviews found for the selected state</p>
        )}
        {filteredDocs.map((doc) => (
          <div className="card" key={doc._id}>
            <img src={`data:image/jpeg;base64,${doc.image}`} alt="img" />
            <div id="details">
              <span id="place">{doc.place}</span>
              <span id="city">{doc.city}</span>
              <span id="state">{doc.state}</span>
            </div>
            <div id="user_data">
              <p id="name">
                <FaUser id="icon" /> {doc.username}
              </p>
              <p id="exp">Experience</p>
              <p>{doc.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;
