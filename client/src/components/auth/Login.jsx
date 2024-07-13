import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export default function Login() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/loginsubmit", {
        user_email: useremail,
        password: password,
      });
      console.log(response.data.user_name);
      if (response.data.status) {
        navigate(
          `/dashboard/${response.data.user_name}/${response.data.user_id}`
        );
      } else {
        alert(response.data.err_msg);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginbox">
        <div>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
              alt="email"
            ></img>
            <input
              type="email"
              placeholder="Email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
            ></input>
          </span>

          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/128/8300/8300875.png"
              alt="password"
            ></img>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </span>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an accout? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}
