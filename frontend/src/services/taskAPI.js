
async function getTasks()
{
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();

    if(res.ok)
    {
        return data;
    }
    else
    {
        throw new Error(`Failed to fetch tasks: ${res.status}`);
    }
}

async function addNewTask(task)
{
    const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

    const data = await res.json();
    if(res.ok)
    {
        return data.task;
    }
    else
    {
        throw new Error(`Failed to add task: ${res.status}`);
    }
}

async function updateTask(id, taskTimerState)
{
    const res = await fetch(`http://127.0.0.1:3001/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({timer_state: taskTimerState})
    });

    const data = await res.json();

    if(res.ok)
    {
        return data.task;
    }
    else 
    {
        throw new Error(`Failed to update task: ${res.status}`);
    }
}

async function deleteTask(id)
{
    const res = await fetch(`http://127.0.0.1:3001/tasks/${id}`, {
        method: 'DELETE'
    });

    const data = await res.json();

    if(res.ok)
    {
        return data.task;
    }
    else
    {
        throw new Error(`Failed to delete task: ${res.status}`)
    }
}

export { getTasks, addNewTask, updateTask, deleteTask };