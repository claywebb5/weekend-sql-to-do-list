const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// <GET LAND>---------------------------------------------------------------------
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log('Error making task list in GET LAND:', queryText, err);
            res.sendStatus(500);
        });
});
// <GET LAND>---------------------------------------------------------------------

// <POST LAND>------------------------------------------------------------------------
router.post('/', (req, res) => {
    const newTask = req.body;
    console.log('Added a new task!:', newTask);
    let queryText = `
        INSERT INTO "tasks" ("task", "date") 
        VALUES ($1, $2);
    `;
    // parameterized query, prevents SQL injection
    pool.query(queryText, [newTask.task, newTask.date])
        .then((result) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log('Error querying in POST LAND:', queryText, err);
            res.sendStatus(500);
        })
});
// <POST LAND>------------------------------------------------------------------------

// <PUT LAND>---------------------------------------------------------------------

module.exports = router;