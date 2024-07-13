import React, { useState } from "react";
import axios from "axios";

function RecSystem() {
  const [userInterests, setUserInterests] = useState("");
  const [numRecommendations, setNumRecommendations] = useState();
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/recommend",
        {
          user_interests: userInterests,
          num_recommendations: numRecommendations,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRecommendations(response.data.recommendations);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="ml_container">
      <h1> Destination Recommendation System</h1>
      <div className="input_container">
        <h3>Enter Your Intrests</h3>
        <p>
          You can Enter like Nature lover, Peace, Adventure or You can also
          Enter favorite city name
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your intrest"
            value={userInterests}
            onChange={(e) => setUserInterests(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter number of recommendations"
            value={numRecommendations}
            onChange={(e) => setNumRecommendations(e.target.value)}
          />
          <button type="submit">Recommend</button>
        </form>
      </div>
      <div className="result">
        {recommendations.map((destination, index) => (
          <div key={index} className="result_card">
            <p>
                    <span>{index+1}. {destination.Name}</span>
              <span>
                {destination.Google_review_rating} <span id="star">★</span>
              </span>
            </p>
            <p>
              {destination.Type} ({destination.Significance})
            </p>
            <p>
              {destination.State}, {destination.City}
            </p>
            <p>Best to Visit: {destination.Best_Time_to_visit} time</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecSystem;
