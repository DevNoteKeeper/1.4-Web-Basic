import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

const competitiondb = new sqlite3.Database('competition.db');

export function getTopCompetitions(req, res) {
    const query = `
        SELECT c.competition_id, c.title, COUNT(rb.post_id) AS post_count, cp.company, c.endDate, c.poster
        FROM Competition c
        LEFT JOIN RecruitBoard rb ON c.competition_id = rb.competition_id
        INNER JOIN ContactPerson cp ON c.competition_id = cp.competition_id
        GROUP BY c.competition_id, c.title, cp.company
        ORDER BY post_count DESC, c.endDate DESC
        LIMIT 3;
    `;
    competitiondb.all(query, [], (err, rows) => {
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
}

export function getAllCompetitions(req, res) {
    const query = `
                SELECT c.*, 
                COALESCE(COUNT(rb.post_id), 0) AS post_count
            FROM Competition c
            LEFT JOIN RecruitBoard rb ON c.competition_id = rb.competition_id
            GROUP BY c.competition_id
            ORDER BY c.endDate DESC;

    `;
    competitiondb.all(query, [], (err, rows) => {
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
}

export function getCompetitionById(req, res) {
    const competitionId = req.params.competitionId;

    const query = `
        SELECT c.*
        FROM Competition c
        WHERE c.competition_id = ?
    `;
    competitiondb.get(query, [competitionId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if (!row) {
            res.status(404).send('Competition not found');
            return;
        }
        res.status(200).json(row);
    });
}

export function getTopPosts(req, res) {
    const query =`
    SELECT rb.post_id, rb.title AS post_title, rb.competition_id, cmp.title AS competition_title, COUNT(c.comment_id) AS comment_count
    FROM RecruitBoard rb
    LEFT JOIN Comment c ON rb.post_id = c.post_id
    INNER JOIN Competition cmp ON rb.competition_id = cmp.competition_id
    GROUP BY rb.post_id
    ORDER BY comment_count DESC
    LIMIT 3
    `;

    competitiondb.all(query, [], (err, rows) => {
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(rows);
    });
}



export function registerCompetition(req, res) {
    const { title, startDate, endDate, homepage, context, tags, company, name, email } = req.body;
    const poster = req.file ? req.file.path : null;
    const competition_id = uuidv4();

    const decodedContext = decodeURIComponent(context);

    const insertCompetition = `
        INSERT INTO Competition (competition_id, title, startDate, endDate, homepage, poster, context, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertContactPerson = `
        INSERT INTO ContactPerson (competition_id, company, name, email)
        VALUES (?, ?, ?, ?)
    `;

    competitiondb.serialize(() => {
        competitiondb.run(insertCompetition, [competition_id, title, startDate, endDate, homepage, poster, decodedContext, tags], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
                return;
            }

            competitiondb.run(insertContactPerson, [competition_id, company, name, email], (err) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Internal server error');
                    return;
                }
                res.status(200).send('<script>alert("Registration successful"); window.location.href = "/";</script>');
            });
        });
    });
}

