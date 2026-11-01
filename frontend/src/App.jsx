import "./App.css";
import { useState, useEffect } from "react";
import ActiveTasksTab from "./components/ActiveTasksTab.jsx";
import TaskHistoryTab from "./components/TaskHistoryTab.jsx";
import { Routes, Route, NavLink } from "react-router";


import {
  getTasks,
  addNewTask,
  updateTask,
  deleteTask,
} from "./services/taskAPI.js";

function App() {

  const nextTimerState = {
    "Not Active": ["Running"],
    "Running": ["Paused", "Completed"],
    "Paused": ["Running", "Completed"],
    "Completed": []
  }

  const timer_status = {
    "Not Active": "Not Started",
    "Running": "In Progress",
    "Paused": "In Progress",
    "Completed": "Completed"
  };

  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const activeTasks = tasks.filter(task => task.timer_state !== "Completed");
  const completedTasks = tasks.filter(task => task.timer_state === "Completed");
  const minimum_break_threshold = 20 * 1000;
  async function fetchTasks() {
    try {
        const data = await getTasks();

        setTasks(data);
    } catch (error) {
        console.error("Failed to fetch GET:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const data = await deleteTask(id);

      setTasks((currTasks) => {
        return currTasks.filter((task) => task.id !== data.id);
      });
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    try {
      const data = await addNewTask(task);

      setTasks((currTasks) => {
          return [...currTasks, data];
      });

      setTask({ title: "", description: ""});
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  function handleOnChange(e) {
    const { value, name } = e.target;

    setTask((prevValue) => {
        return {
            ...prevValue,
            [name]: value
        }
    });
  }

  async function handleTransition(id, requestedState) {
    try {
        const currentTask = tasks.find(task => task.id === id);
        const prev_timer_state = currentTask?.timer_state ?? "Not Active";

        if (currentTask && nextTimerState[prev_timer_state].includes(requestedState)) {

            const data = await updateTask(id, requestedState);

            setTasks((currTasks) => {
                return currTasks.map((currTask) => {
                    if (currTask.id === id) {
                        return {
                            ...currTask,
                            ...data
                        };
                    }

                    return currTask;
                });
            });
        }
    } catch (error) {
        console.error("Failed to update task:", error);
    }
}

  return (
    <>
      <header className="app-header">
        <h1>ADHD Task Tracker</h1>
        <nav className="navigation-bar">
          <NavLink to="/" end
          className={({ isActive }) => isActive ? "nav-active" : "nav-link"}>Active Tasks</NavLink>
          <NavLink to="/history"className={({ isActive }) => isActive ? "nav-active" : "nav-link"}>Task History</NavLink>
        </nav>
      </header>

      <Routes>
        <Route 
          path="/"
          element={
            <ActiveTasksTab
              activeTasks={activeTasks}
              task={task}
              timer_status={timer_status}
              minimum_break_threshold={minimum_break_threshold}
              handleAddTask={handleAddTask}
              handleOnChange={handleOnChange}
              handleTransition={handleTransition}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="/history"
          element={
            <TaskHistoryTab 
              completedTasks={completedTasks}
              handleDelete={handleDelete}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
