import express from 'express';
import pg from "pg";
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors({origin: 'http://localhost:5173'}));

const nextTimerState = {
    "Not Active": ["Running"],
    "Running": ["Paused", "Completed"],
    "Paused": ["Running", "Completed"],
    "Completed": []
  }

const db = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

function normalizeTask(task)
{
    return {
        ...task,
        accumulated_time: Number(task.accumulated_time),
        started_at: task.started_at
            ? new Date(task.started_at).getTime()
            : null
    };
}

app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        res.status(200).json(result.rows.map(normalizeTask));

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            message: "Failed to retrieve tasks"
        });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *", [req.body.title, req.body.description]);
        res.status(201).json({
            message: "Task received",
            task: normalizeTask(result.rows[0])
        });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            message: "Failed to add task"
        });
    }
});

app.patch("/tasks/:id", async (req, res) => {
    let client;
    try {
        client = await db.connect();
        await client.query("BEGIN");

        const result = await client.query(
            "SELECT timer_state, started_at, accumulated_time FROM tasks WHERE id = $1 FOR UPDATE",
            [req.params.id]
        );

        if (result.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                message: "Task not found"
            });
        }

        const currentState = result.rows[0].timer_state;
        const requestedState = req.body.timer_state;
        
        if (!nextTimerState[currentState]?.includes(requestedState)) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                message: "Invalid timer state transition"
            });
        }      
        
        const previousStartedAt = result.rows[0].started_at;
        let accumulated_time = Number(result.rows[0].accumulated_time);

        if (currentState === "Running" && previousStartedAt == null) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                message: "Running task has no starting timestamp"
            });
        }

        const transitionTime = Date.now();

        if(currentState === "Running" && previousStartedAt != null)
        {
            accumulated_time += Math.max(0, transitionTime - previousStartedAt.getTime());
        }

        const newStartedAt = requestedState === "Running" ? new Date(transitionTime) : null;

        const updatedTask = await client.query(
            "UPDATE tasks SET timer_state = $1, accumulated_time = $2, started_at = $3 WHERE id = $4 RETURNING *",
            [requestedState, accumulated_time, newStartedAt, req.params.id]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            message: "Task updated",
            task: normalizeTask(updatedTask.rows[0])
        });

    } catch (err) {
        if(client)
        {
            await client.query("ROLLBACK").catch(console.error);
        }           
        console.error("Database error:", err);

        return res.status(500).json({
            message: "Failed to update task"
        });
    } finally {
        if(client)
        {
            client.release();
        }
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
