import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "./api";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const completedTasks = tasks.filter(
    (t) => t.completed
  ).length;

  const pendingTasks = tasks.filter(
    (t) => !t.completed
  ).length;

  const filteredTasks = tasks.filter((t) =>
    t.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const logoutUser = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

/* eslint-disable react-hooks/exhaustive-deps */
useEffect(() => {

  if (!token) {

    navigate("/login");

  } else {

    fetchTasks();
  }

}, [navigate, token]);

  const addTask = async () => {

    if (task.trim() === "") return;

    try {

      if (editId) {

        await axios.put(
          `${API_URL}/api/tasks/${editId}`,
          {
            title: task,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          `${API_URL}/api/tasks`,
          {
            title: task,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setTask("");

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `${API_URL}/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const completeTask = async (id) => {

    try {

      await axios.put(
        `${API_URL}/api/tasks/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container">

      <div className="header">

        <h1>
          Welcome {user?.name}
        </h1>

        <button
          className="logout-btn"
          onClick={logoutUser}
        >
          Logout
        </button>

      </div>

      <div className="dashboard">

        <div className="card">
          <h3>Total</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

      </div>

      <div className="input-section">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="input-section">

        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <button onClick={addTask}>

          {editId
            ? "Update Task"
            : "Add Task"}

        </button>

      </div>

      <ul>

        {filteredTasks.map((t) => (

          <li key={t._id}>

            <span
              style={{
                textDecoration:
                  t.completed
                    ? "line-through"
                    : "none",
              }}
            >
              {t.title}
            </span>

            <div>

              <button
                onClick={() => {

                  setTask(t.title);

                  setEditId(t._id);
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  completeTask(t._id)
                }
              >
                {t.completed
                  ? "Completed"
                  : "Complete"}
              </button>

              <button
                onClick={() =>
                  deleteTask(t._id)
                }
              >
                Delete
              </button>

            </div>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default App;