import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Prevent multiple clicks

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return; // ✅ stop if already submitting
    setLoading(true);

    try {
      const response = await axiosInstance.post("/signupsubmit", {
        first_name: firstName,
        last_name: lastName,
        user_email: userEmail,
        password: password,
      });

      if (response.data.status) {
        alert(response.data.message);
        navigate("/login"); // ✅ redirect after success
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false); // ✅ re-enable button
    }
  };

  return (
    <div className="signupcontainer">
      <div className="signupbox">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
