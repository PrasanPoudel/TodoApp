import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: capitalizeFirstLetter(task), completed: false },
      ]);
      setTask("");
    }
  };

  const updateTask = () => {
    setTasks(
      tasks.map((t) =>
        t.id === currentTaskId ? { ...t, text: capitalizeFirstLetter(task) } : t
      )
    );
    setTask("");
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const handleTaskSubmit = () => {
    if (isEditing) {
      updateTask();
    } else {
      addTask();
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTaskSubmit();
    }
  };

  return (
    <div className="flex justify-center pt-10 h-[100vh]">
      <div className="p-2 flex flex-col gap-5 w-[100vw] md:w-[500px] overflow-auto">
        <h1 className="text-3xl font-bold text-center">Todo App</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="flex-grow border placeholder:text-xl border-gray-500 px-5 py-2 rounded-lg focus:outline-none"
            placeholder="Enter a new task:"
            value={task}
            onChange={(e) => setTask(capitalizeFirstLetter(e.target.value))}
            onKeyDown={handleKeyDown} 
          />
          <div className="flex gap-2 md:gap-4 justify-end">
            <button
              onClick={handleTaskSubmit}
              className="bg-green-500 rounded-lg text-white px-5 w-[100px] py-2"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => {
                setTask("");
              }}
              className="bg-red-500 rounded-lg hover:bg-red-600 text-white px-5 w-[100px] py-2"
            >
              Cancel
            </button>
          </div>
        </div>
        <ol className="flex flex-col gap-5">
          {tasks.map((t, index) => (
            <li
              key={t.id}
              className="flex flex-col justify-center md:items-center md:flex-row items-start gap-2 "
            >
              <span className="font-medium">{index + 1}.</span>
              <div className="border-[1px] rounded-lg border-gray-500 flex flex-col w-[95%] p-2 gap-5">
                <div
                  className={` w-full text-xl text-justify break-words ${
                    t.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {t.text}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setTask(t.text);
                      setIsEditing(true);
                      setCurrentTaskId(t.id);
                    }}
                    className="bg-blue-500 rounded-lg text-white px-5 py-2 w-full sm:w-auto hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="bg-red-500 rounded-lg text-white px-5 py-2 w-full sm:w-auto hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleComplete(t.id)}
                    className={`px-5 py-2 rounded-lg w-full sm:w-auto transition ${
                      t.completed
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                  >
                    {t.completed ? "Undo" : "Complete"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
