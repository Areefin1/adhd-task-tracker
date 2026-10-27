import "./App.css";
import Task from "./Task.jsx";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskControl from "./TaskControl.jsx"
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
    description: "",
    status: "Not Started",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

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

      setTask({ title: "", description: "", status: "Not Started" });
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

  async function handleTransition(id, requestedState)
  {
    try {
          const currentTask = tasks.find(task => task.id === id);
          if(currentTask && nextTimerState[currentTask.timer_state ?? "Not Active"].includes(requestedState))
          {
              const data = await updateTask(id, requestedState);

              setTasks((currTasks) => {
                return currTasks.map((currTask) => {
                  if(currTask.id === id)
                  {
                    return {
                      ...currTask,
                      timer_state: data.timer_state
                    }
                  }
                  return currTask;
                });
              });
          }
    } catch (error) {
        console.error("Failed to update task:", error)
    }
  }

  return (
    <>
      <h1>ADHD Task Tracker</h1>
      <h2>Create a New Task</h2>
        <TaskForm
        addTask={handleAddTask}
        onChange={handleOnChange}
        title={task.title}
        description={task.description}
      />
      <div className="heading">
          <h2>Title</h2>
          <h2>Description</h2>
          <h2>Status</h2>
          <h2>Actions</h2>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="task-row">
            <Task
            id={task.id}
            title={task.title}
            description={task.description}
            status={timer_status[task.timer_state ?? "Not Active"]}
            />
            <div className="actions">            
              <TaskControl
              id={task.id} 
              current_state={task.timer_state ?? "Not Active"}
              onTransition={handleTransition}
              />
              <input 
              type="button"
              value={"Delete"}
              onClick={() => handleDelete(task.id)}
              />
            </div>
        </div>
      ))}
    </>
  );
}

export default App;
