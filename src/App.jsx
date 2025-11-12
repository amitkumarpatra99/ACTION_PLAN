import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🧠 React Icons
import { FaPlus, FaTrash, FaEdit, FaCalendarAlt, FaTasks } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // 🧠 Load todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // ⏰ Reminder system
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach((task) => {
        if (!task.isCompleted && task.dueDate) {
          const due = new Date(task.dueDate);
          const diff = due - now;

          if (diff > 0 && diff <= 60 * 60 * 1000) {
            toast.info(`⏰ Reminder: "${task.todo}" is due soon!`, {
              position: "top-right",
              autoClose: 4000,
              theme: "colored",
            });
          }

          if (diff < 0 && !task.remindedOverdue) {
            toast.error(`⚠️ Task overdue: "${task.todo}"`, {
              position: "top-right",
              autoClose: 4000,
              theme: "colored",
            });
            task.remindedOverdue = true;
            saveToLS();
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  const saveToLS = (updatedTodos = todos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleFinished = () => setShowFinished(!showFinished);

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    setDueDate(t.dueDate || "");
    setTodos(todos.filter((item) => item.id !== id));
    saveToLS();
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
    toast.success("🗑️ Task Deleted!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const handleAdd = () => {
    if (todo.trim().length <= 3) {
      toast.warn("⚠️ Task must be at least 4 characters", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    const newTask = {
      id: uuidv4(),
      todo,
      isCompleted: false,
      dueDate,
      remindedOverdue: false,
    };
    const newTodos = [...todos, newTask];
    setTodos(newTodos);
    setTodo("");
    setDueDate("");
    saveToLS(newTodos);
    toast.success("✅ Task Added!", {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      {/* 🌌 Royal Blue Background */}
      <div
        className="flex flex-col items-center min-h-screen px-4 sm:px-6 md:px-10 py-24 pt-32 text-white bg-gradient-to-br from-[#0a0c2a] via-[#0a2f7b] to-[#0f66d0]"
      >
        {/* 🧊 Glass Card */}
        <div className="w-full max-w-4xl backdrop-blur-2xl rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 shadow-[0_8px_32px_rgba(31,38,135,0.4)]">
          <h1 className="font-extrabold text-3xl md:text-4xl text-center mb-8 tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <FaTasks className="text-blue-400" />
            Action Planner
          </h1>

          {/* ➕ Add Task Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full lg:w-[45%]">
              <input
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
                type="text"
                placeholder="Write your next task..."
                className="w-full px-5 py-3 pl-12 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md"
              />
              <FaTasks className="absolute left-4 top-3.5 text-blue-300" />
            </div>

            <div className="relative w-full lg:w-[35%]">
              <input
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
                type="datetime-local"
                className="w-full px-5 py-3 pl-12 rounded-full bg-white/20 text-white focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md"
              />
              <FaCalendarAlt className="absolute left-4 top-3.5 text-blue-300" />
            </div>

            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className={`flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
                todo.length > 3
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:scale-105"
                  : "bg-gray-400/50 text-gray-300 cursor-not-allowed"
              }`}
            >
              <FaPlus /> Add
            </button>
          </div>

          {/* 🔘 Show Finished */}
          <div className="flex items-center gap-3 mb-4">
            <input
              id="show"
              onChange={() => setShowFinished(!showFinished)}
              type="checkbox"
              checked={showFinished}
              className="accent-blue-400 scale-125"
            />
            <label htmlFor="show" className="font-medium text-sm md:text-base">
              Show Completed Tasks
            </label>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full mb-6 bg-white/30"></div>

          {/* 🧾 Task List */}
          <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
          <div className="space-y-3">
            {todos.length === 0 && (
              <div className="text-gray-300 text-center py-4 italic">
                No tasks yet — plan your goals like a pro!
              </div>
            )}

            {todos.map(
              (item) =>
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-2xl p-4 sm:p-5 bg-white/15 border border-white/20 backdrop-blur-xl hover:scale-[1.02] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 w-full">
                      <div className="flex items-center gap-3">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                          className="scale-125 accent-green-400"
                        />
                        <span
                          className={`text-base md:text-lg break-words ${
                            item.isCompleted
                              ? "line-through opacity-60"
                              : "opacity-100"
                          }`}
                        >
                          {item.todo}
                        </span>
                      </div>

                      {item.dueDate && (
                        <div
                          className={`text-sm font-medium ${
                            isOverdue(item.dueDate)
                              ? "text-red-400"
                              : "text-blue-300"
                          }`}
                        >
                          <FaCalendarAlt className="inline mr-2 text-blue-400" />
                          {new Date(item.dueDate).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-3 sm:mt-0">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:scale-105 transition-all"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-full bg-gradient-to-r from-red-600 to-pink-500 text-white hover:scale-105 transition-all"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-xs sm:text-sm md:text-base mt-10 opacity-80 text-center">
          Designed by <span className="font-semibold text-blue-300">Amit</span> 💡 | Built with ❤️ React + Tailwind
        </footer>
      </div>
    </>
  );
}

export default App;
