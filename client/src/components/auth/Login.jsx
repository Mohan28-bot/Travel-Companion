import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // 👈 needed for navigation
import axios from "axios";

// 👇 axios instance to call your Flask backend
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export default function Login() {
  // 👇 states for form inputs
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 now defined properly

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/loginsubmit", {
        user_email: useremail,
        password: password,
      });

      if (response.data.status) {
        // ✅ store user info for later
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("user_id", response.data.user_id);

        // ✅ navigate to dashboard
        navigate(`/dashboard/${response.data.user_name}/${response.data.user_id}`);
      } else {
        alert(response.data.err_msg);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginbox">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
              alt="email"
            />
            <input
              type="email"
              placeholder="Email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
            />
          </span>

          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/128/8300/8300875.png"
              alt="password"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}
