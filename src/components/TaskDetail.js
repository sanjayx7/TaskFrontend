import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './TaskDetail.css'; 

const TaskDetail = () => {
  const { id } = useParams(); 
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/tasks/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details", error);
      }
    };
    fetchTask();
  }, [id]);

  if (!task) return <div className="loading">Loading...</div>;

  return (
    <div className="task-detail-container">
      <div className="card">
        <h2 className="task-title">Task Details</h2>
        <div className="task-info">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status ? "Completed" : "Pending"}</p>
          <p><strong>Date Added:</strong> {new Date(task.created_at).toLocaleString()}</p>
          <p><strong>Last Edited:</strong> {new Date(task.updated_at).toLocaleString()}</p>
        </div>
        <button className="back-button" onClick={() => navigate("/tasks")}>
          Back to Task List
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
