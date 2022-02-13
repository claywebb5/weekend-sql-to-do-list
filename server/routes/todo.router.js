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
router.put('/:id', (req, res) => {
    let status = req.body.status;
    let id = req.params.id;
    console.log(`Updating Task ${id} with`, status);
    
    let sqlText = '';
    if (status === 'Completed Task') {
        sqlText = `UPDATE "tasks" SET "status" = 'True' WHERE "id" = $1;`;
    } else {
        res.sendStatus(500)
        return;
    }

    let sqlValues = [id];

    pool.query(sqlText, sqlValues)
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log('err making PUT request back end:', err);
            res.sendStatus(500);
        })
})
// <PUT LAND>---------------------------------------------------------------------

// <DELETE>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// <DELETE>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;