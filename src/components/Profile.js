import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import AuthContext from "./AuthContext";
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/profile/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          setProfile(response.data);
        } catch (error) {
          setError("Failed to fetch profile data.");
        }
      };
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2 className="profile-title">Your Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="profile-info">
          <p>
            <span className="info-label">First Name:</span> {profile.first_name}
          </p>
          <p>
            <span className="info-label">Last Name:</span> {profile.last_name}
          </p>
          <p>
            <span className="info-label">Username:</span> {profile.username}
          </p>
          <p>
            <span className="info-label">Email:</span> {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
