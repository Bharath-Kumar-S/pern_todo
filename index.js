const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [ description ]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error)
    }
})

app.listen(5000, () => {
    console.log('Server running');
})