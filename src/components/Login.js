import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext"; 
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/login/", formData);
      if (response.status === 200) {
        
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        
        
        login(response.data.access);

        
        navigate("/tasks");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      {location.state && <p className="success-message">{location.state.message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Sign in to your account</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          Sign in
        </button>
        <p className="login-footer">
          New here? <a href="/signup">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
