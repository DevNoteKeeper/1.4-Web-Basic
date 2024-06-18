import sqlite3 from 'sqlite3';

const competitiondb = new sqlite3.Database('competition.db');

export function getCommentsByPostId(req, res) {
    const postId = req.params.postId;

    const query = `
        SELECT * FROM Comment
        WHERE post_id = ?
    `;
    competitiondb.all(query, [postId], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(rows);
    });
}

export function createComment(req, res) {
    const postId = req.params.postId;
    const { name, comment } = req.body;
    const currentDate = new Date();
    const registerDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const randomNum = Math.floor(Math.random() * 1001);
    const commentId = postId + ' ' + randomNum;

    const insertComment = `
        INSERT INTO Comment (comment_id, post_id, name, registerDate, comment) VALUES (?, ?, ?, ?, ?)
    `;

    competitiondb.run(insertComment, [commentId, postId, name, registerDate, comment], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(201).json({message: 'Comment saved successfully'});
    });
}
