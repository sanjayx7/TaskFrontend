import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  
  useEffect(() => {
    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"; // Ensure you have access to the brand icons
    document.head.appendChild(fontAwesomeLink);
    return () => {
      document.head.removeChild(fontAwesomeLink);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        backgroundColor: "#8a2be1",
        alignItems: "center",
        padding: "1rem 2.5rem",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* FontAwesome icon (Stack Overflow) */}
          <i className="fa-brands fa-stack-overflow" style={{ marginRight: "0.5rem" }}></i>
          TASKED
        </NavLink>
      </div>

      {/* Hamburger Icon for mobile */}
      <div className="hamburger" onClick={toggleMenu} style={hamburgerStyle}>
        <div style={hamburgerLine}></div>
        <div style={hamburgerLine}></div>
        <div style={hamburgerLine}></div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className="navbar-links"
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          position: "fixed",
          top: "70px",
          right: 0,
          backgroundColor: "#8a2be1",
          width: "100%",
          textAlign: "center",
          padding: "1rem 0",
          zIndex: 100,
        }}
      >
        <NavLink to="/about" onClick={closeMenu} style={linkStyle}>
          About Us
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink to="/tasks" onClick={closeMenu} style={linkStyle}>
              Tasks
            </NavLink>
            <NavLink to="/profile" onClick={closeMenu} style={linkStyle}>
              Profile
            </NavLink>
            <NavLink to="/login" onClick={handleLogout} style={linkStyle}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu} style={linkStyle}>
              Login
            </NavLink>
            <NavLink to="/signup" onClick={closeMenu} style={linkStyle}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>

      {/* Full Navigation Links for larger screens */}
      <div
        className="navbar-desktop-links"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          display: "none",
        }}
      >
        <NavLink
          to="/about"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "1.5rem",
          }}
        >
          About Us
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink
              to="/tasks"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "1.5rem",
              }}
            >
              Tasks
            </NavLink>
            <NavLink
              to="/profile"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "1.5rem",
              }}
            >
              Profile
            </NavLink>
            <NavLink
              to="/login"
              onClick={handleLogout}
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "1.5rem",
              }}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

const hamburgerStyle = {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  marginLeft: "auto",
};

const hamburgerLine = {
  width: "25px",
  height: "3px",
  backgroundColor: "white",
  margin: "4px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginBottom: "1.5rem",
  cursor: "pointer",
};

const mediaQueryStyle = `
  @media (min-width: 768px) {
    .navbar-links {
      display: none !important;
    }
    .navbar-desktop-links {
      display: flex !important;
    }
    .hamburger {
      display: none !important;
    }
  }
`;

const styleElement = document.createElement("style");
styleElement.textContent = mediaQueryStyle;
document.head.appendChild(styleElement);

export default Header;
