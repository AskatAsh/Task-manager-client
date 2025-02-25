import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const TaskBoard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState(""); // New state for form input
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) return;

    axios
      .get(`${import.meta.env.VITE_SERVER}/api/tasks?userId=${user.uid}`)
      .then((res) => {
        console.log("Fetched tasks:", res.data);
        setTasks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      });
  }, [user?.uid]);

  // add a new task handler
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title is required!");

    // new task with To-Do category by default
    const newTask = {
      title,
      description,
      category: "To-Do",
      userId: user.uid,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/tasks`,
        newTask
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Error adding task:", error);
    }
  };


  const handleLogout = (e) => {
    e.preventDefault();
    logOut().then(() => {navigate('/')})
  }

  return (
    <div className="p-2 sm:p-4 max-w-7xl w-full mx-auto">
      {/* Add a New Task Form */}
      <form onSubmit={handleAddTask} className="mb-4 p-4 bg-gray-100 rounded">
        <div className="flex justify-between flex-wrap gap-2 sm:gap-4 items-center mb-3">
        <h2 className="text-xl font-bold">Add New Task</h2>
        <button onClick={handleLogout} className="border border-gray-700 rounded-md px-4 py-2 active:scale-95">Log out</button>
        </div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="px-8 py-2 bg-purple-500 text-white rounded font-semibold"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskBoard;
