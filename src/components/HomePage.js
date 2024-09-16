import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; 
import "./HomePage.css";

const HomePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, loading } = useContext(AuthContext); 
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const navigateToLogin = () => {
    navigate("/login"); 
    toggleDrawer(); 
  };

  const navigateToSignup = () => {
    navigate("/signup"); 
    toggleDrawer(); 
  };

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>We are awesome!</h1>
          <p>
            Manage your tasks easily and efficiently. Join us to explore the
            benefits of task management and increase your productivity.
          </p>
          {/* Conditionally render the Explore More button based on the authentication status */}
          {!isAuthenticated && (
            <button className="btn-signup" onClick={toggleDrawer}>
              Explore More
            </button>
          )}
        </div>
      </section>

      {/* Drawer */}
      <div className={`drawer ${isDrawerOpen ? "drawer-open" : ""}`}>
        <button className="drawer-close-btn" onClick={toggleDrawer}>
          &times;
        </button>
        <h2>Welcome to Our Platform</h2>
        <p>
          Discover how we can help you manage your tasks and increase
          productivity.
        </p>
        <button className="btn-signup" onClick={navigateToLogin}>
          Login
        </button>
        <button className="btn-signup" onClick={navigateToSignup}>
          Sign Up
        </button>
      </div>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <p>
          We provide a wide range of services to help you achieve your goals.
          Here are some of the key services we offer.
        </p>
        <div className="services-container">
          <div className="service-card">
            <i className="fas fa-bolt fa-3x"></i>
            <h3>Fast Operations</h3>
            <p>Speed and efficiency in everything we do.</p>
          </div>
          <div className="service-card">
            <i className="fa-solid fa-person fa-3x"></i>
            <h3>Consultation</h3>
            <p>Expert advice to guide your decisions.</p>
          </div>
          <div className="service-card">
            <i className="fa-regular fa-lightbulb fa-3x"></i>
            <h3>Renovation</h3>
            <p>Transforming spaces with new ideas.</p>
          </div>
          <div className="service-card">
            <i className="fa-solid fa-circle-radiation fa-3x"></i>
            <h3>Architecture</h3>
            <p>Designing structures for modern needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
