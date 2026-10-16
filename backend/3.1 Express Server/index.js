import express from 'express';
const app = express();

let tasks = [
  {
    id: 1,
    title: "Test task",
    description: "Temporary backend task",
    status: "Not Started"
  }
];

app.use(express.json());

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    console.log(req.body);

    const newTask = {
        id: crypto.randomUUID(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    tasks.push(newTask);

    res.json({
        message: "Task received",
        task: req.body
    });
});

app.patch("/tasks/:id", (req, res) => {
    const id = req.params.id;

    const task = tasks.find(task => task.id === id);

    if(!task)
    {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.status = req.body.status;
    res.json({
        message: "Task updated",
        task: task
    });
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
