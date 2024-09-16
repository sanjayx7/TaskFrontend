import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import Profile from "./components/Profile"; // Import Profile component
import Header from "./components/Header";
import AboutUs from "./components/AboutUs"; // Import AboutUs component
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
          <Route path="/about" element={<AboutUs />} /> {/* Add About Us route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
