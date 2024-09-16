import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/tasks/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      if (isEditing !== null) {
        await axios.put(
          `http://127.0.0.1:8000/api/v1/tasks/${isEditing}/`,
          { title, description },
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );
        const updatedTasks = tasks.map((task) =>
          task.id === isEditing ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        setIsEditing(null);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/tasks/",
          { title, description, status: false },
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );
        setTasks([...tasks, response.data]);
        setFilteredTasks([...tasks, response.data]);
      }
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding or updating task", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/tasks/${taskId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
      setFilteredTasks(filteredTasks);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return;

      await axios.put(
        `http://127.0.0.1:8000/api/v1/tasks/${taskId}/`,
        { title: taskToUpdate.title, description: taskToUpdate.description, status: !currentStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: !currentStatus } : task
      );
      setTasks(updatedTasks);
      filterTasks(filter, updatedTasks);
    } catch (error) {
      console.error("Error toggling task status", error);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    filterTasks(selectedFilter, tasks);
  };

  const filterTasks = (selectedFilter, taskList) => {
    if (selectedFilter === "completed") {
      setFilteredTasks(taskList.filter((task) => task.status === true));
    } else if (selectedFilter === "pending") {
      setFilteredTasks(taskList.filter((task) => task.status === false));
    } else {
      setFilteredTasks(taskList);
    }
  };

  const openAddTaskModal = () => {
    setIsModalOpen(true);
    setIsEditing(null);
    setTitle("");
    setDescription("");
  };

  const openEditTaskModal = (task) => {
    setIsModalOpen(true);
    setIsEditing(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="tasklist-container">
      <button className="add-task-btn" onClick={openAddTaskModal}>
        + Add Task
      </button>

      <div className="task-filter">
        <label>Filter Tasks:</label>
        <select onChange={(e) => handleFilterChange(e.target.value)} className="filter-select">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="task-card-container">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${hoveredCard === task.id ? "task-card-hover" : ""}`}
            onMouseEnter={() => setHoveredCard(task.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="task-title" onClick={() => navigate(`/tasks/${task.id}`)}>
              {task.title}
            </div>
            <div className="task-description">{task.description}</div>
            <div className="task-status">
              Status: {task.status ? "Completed" : "Pending"}
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => handleToggleStatus(task.id, task.status)}
              />
            </div>
            <div className="task-actions">
              <button className="action-btn" onClick={() => openEditTaskModal(task)}>
                Edit
              </button>
              <button className="action-btn" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-background" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmitTask} className="modal-form">
              <input
                type="text"
                placeholder="Task Title"
                className="modal-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Task Description"
                rows={4}
                className="modal-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button type="submit" className="modal-submit-btn">
                {isEditing ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
