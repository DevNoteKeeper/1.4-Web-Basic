import express from 'express';
import sqlite3 from 'sqlite3';

const algorithmdb = new sqlite3.Database('algorithm.db');

const router = express.Router();

router.get('/', (req, res) => {
    const query = "SELECT * FROM algorithmSite";
    algorithmdb.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if (!rows || rows.length === 0) {
            res.status(400).send('Data not found');
            return;
        }
        res.status(200).json(rows);
    });
});

export default router;
