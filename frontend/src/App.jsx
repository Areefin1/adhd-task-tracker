import './App.css'
import Task from './Task.jsx';
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';



function App() {

  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState({
      title: '', 
      description: '', 
      status: ''
    });

    useEffect(() => {
      fetchTasks();
  }, []);

  async function fetchTasks()
  {
    try {
      const response = await fetch('http://localhost:3001/tasks');
      const data = await response.json();
      console.log(data);

      if(response.ok)
      {
        setTasks(data);
      }
    } catch (error) {
        console.error("Failed to fetch GET:", error);
    }
  }

async function handleEdit(id, taskStatus)
{
  try {
    const response = await fetch(`http://127.0.0.1:3001/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: taskStatus})
    });
    
    const data = await response.json();

    if(response.ok)
    {
      console.log(data.task);
      setTasks(currTasks => {
        return currTasks.map(currTask => {
          if (currTask.id === id)
          {
            return {
              ...currTask,
              status: taskStatus
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

  function createTask(task)
  {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    ) 
  }

  async function handleDelete(id)
  {
    try {
        const response = await fetch(`http://127.0.0.1:3001/tasks/${id}`, {
          method: "DELETE"
        });

        const data = await response.json();

        if(response.ok)
        {
          console.log(data);
          setTasks(currTasks => {
            return currTasks.filter(task => task.id !== id);
          });
        }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }

  async function AddTask(e)
  {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      const data = await response.json();

      if(response.ok)
      {
        console.log(data.task);
        setTasks(currTasks => {
          return [...currTasks, data.task]
        });

        setTask({title: '', description: '', status: ''});
      }
    } catch (error) {
      console.error("Failed to add task:", error)
    }
  }

  function handleOnChange(e)
  {
     const { value, name } = e.target;

     console.log(value);
     console.log(name);

     setTask(prevValue => {
      if(name === 'title')
      {
        return {
          title: value,
          description: prevValue.description,
          status: prevValue.status
        }
      }
      else if(name === 'description')
      {
        return {
          title: prevValue.title,
          description: value,
          status: prevValue.status
        }
      }
      else if(name === 'status')
      {
        return {
          title: prevValue.title,
          description: prevValue.description,
          status: value,
        }
      }
     });
  }

  return (
    <>
          <h1>Task Tracker</h1>
          {tasks.map(createTask)}
          <TaskForm 
          addTask={AddTask} 
          onChange={handleOnChange} 
          title={task.title} 
          description={task.description}
          status={task.status}
          />
    </>
  )
}

export default App
