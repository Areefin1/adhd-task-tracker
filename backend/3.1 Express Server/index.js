import express from 'express';
import pg from "pg";
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));

const db = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

await db.connect();

app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        res.status(200).json(result.rows);

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            message: "Failed to retrieve tasks"
        });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *", [req.body.title, req.body.description])
        res.status(201).json({
            message: "Task received",
            task: result.rows[0]
    });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            message: "Failed to add task"
        });
    }
});

app.patch("/tasks/:id", async (req, res) => {
        try {
            const result = await db.query("UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *", [req.body.status, req.params.id]);

            if(result.rowCount === 1)
            {
                res.status(200).json({
                    message: "Task updated",
                    task: result.rows[0]
                });
            }
            else if(result.rowCount === 0)
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
        } catch (err) {
            console.error("Database error:", err);
            res.status(500).json({
                message: "Failed to update task"
            });
        }
});

app.delete("/tasks/:id", async (req, res) => {

    try {
        const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [req.params.id]);

        if(result.rowCount === 1)
        {
            res.status(200).json({
                message: "Task deleted",
                task: result.rows[0]
            });
        }
        else if(result.rowCount === 0)
        {
            res.status(404).json({
                message: "Task not found"
            });
        }
    }
    catch(err) 
    {
        console.error("Database error:", err);
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
