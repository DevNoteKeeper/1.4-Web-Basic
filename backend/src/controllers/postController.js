import sqlite3 from 'sqlite3';

const competitiondb = new sqlite3.Database('competition.db');

export function getPostsByCompetitionId(req, res) {
    const competitionId = req.params.competitionId;

    const query = `
        SELECT rb.post_id, rb.title, rb.registerDate, rb.competition_id, COUNT(c.comment_id) AS comment_count
        FROM RecruitBoard rb
        LEFT JOIN Comment c ON rb.post_id = c.post_id
        WHERE rb.competition_id = ?
        GROUP BY rb.post_id
    `;
    competitiondb.all(query, [competitionId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(rows);
    });
}

export function createRecruitmentPost(req, res) {
    const competition_id = req.params.competitionId;
    const { title, password, context } = req.body;
    const currentDate = new Date();
    const registerDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const insertRecruitment = `
        INSERT INTO RecruitBoard (competition_id, title, password, context, registerDate) VALUES (?, ?, ?, ?, ?)
    `;

    competitiondb.run(insertRecruitment, [competition_id, title, password, context, registerDate], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send('Recruitment post saved successfully');
    });
}

export function getPostById(req, res) {
    const competitionId = req.params.competitionId;
    const postId = req.params.postId;

    const query = `
        SELECT * FROM RecruitBoard
        WHERE competition_id = ? AND post_id = ?
    `;
    competitiondb.get(query, [competitionId, postId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if (!row) {
            res.status(404).send('Post not found');
            return;
        }
        res.status(200).json(row);
    });
}
