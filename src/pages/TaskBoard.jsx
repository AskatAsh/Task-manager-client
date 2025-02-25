import { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const TaskBoard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState(""); // New state for form input
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // get all tasks added by user
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

  // add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title is required!");

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
      console.error("Error adding task:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    // If the item is dropped outside a valid droppable area, do nothing
    if (!destination) return;

    // If the item was dropped in the same place (no change), do nothing
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    // Reorder tasks
    const updatedTasks = [...tasks];
    // Remove the task from its original position
    const [movedTask] = updatedTasks.splice(source.index, 1); 
    // Change the category to the new one
    movedTask.category = destination.droppableId; 
    // Insert the task in the new position
    updatedTasks.splice(destination.index, 0, movedTask); 

    // Update tasks state
    setTasks(updatedTasks);

    // update the new order and category in the backend
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/tasks/${movedTask._id}`,
        movedTask
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = (task) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER}/api/tasks/${task._id}`)
      .then(() => setTasks(tasks.filter((t) => t._id !== task._id)));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="p-2 sm:p-4 max-w-7xl w-full mx-auto">
      {/* Add a New Task Form */}
      <form onSubmit={handleAddTask} className="mb-4 p-4 bg-gray-100 rounded">
        <div className="flex justify-between flex-wrap gap-2 sm:gap-4 items-center mb-3">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button
            onClick={handleLogout}
            className="border border-gray-700 rounded-md px-4 py-2 active:scale-95"
          >
            Log out
          </button>
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

      {/* Drag and Drop Task Board section */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className="flex gap-2 sm:gap-4 flex-wrap justify-center">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable droppableId={category} key={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-2 sm:p-4 bg-gray-100 rounded"
                >
                  <h2 className="sm:text-xl font-bold border-b sm:pb-2 sm:mb-4">
                    {category}
                  </h2>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 my-2 bg-white shadow rounded"
                          >
                            <h3 className="text-xs sm:text-lg font-semibold text-gray-800">
                              {task.title}
                            </h3>
                            <p className="text-gray-600 py-2 text-[10px] sm:text-base">
                              {task.description}
                            </p>
                            <button
                              onClick={() => handleDelete(task)}
                              className="px-4 py-1 bg-red-500 text-white rounded font-semibold text-[8px] mt-1"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </section>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
