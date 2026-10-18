import "./App.css";
import Task from "./Task.jsx";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm.jsx";
import {
  getTasks,
  addNewTask,
  updateTask,
  deleteTask,
} from "./services/taskAPI.js";

function App() {
  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
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

  async function handleEdit(id, taskStatus) {
    try {
      const data = await updateTask(id, taskStatus);

      setTasks((currTasks) => {
        return currTasks.map((currTask) => {
          if (currTask.id === id) {
            return {
              ...currTask,
              status: data.status,
            };
          }
          return currTask;
        });
      });
    } catch (error) {
      console.error("Failed to update task:", error);
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

      setTask({ title: "", description: "", status: "" });
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

  return (
    <>
      <h1>Task Tracker</h1>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      <TaskForm
        addTask={handleAddTask}
        onChange={handleOnChange}
        title={task.title}
        description={task.description}
        status={task.status}
      />
    </>
  );
}

export default App;
