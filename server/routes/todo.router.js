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
            console.log('Error making task list:', queryText, err);
            res.sendStatus(500);
        });
});
// <GET LAND>---------------------------------------------------------------------



module.exports = router;