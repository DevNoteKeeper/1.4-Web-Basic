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
        
        res.status(201).json({message: 'Recruitment post saved successfully'});
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

export function deletePostById(req, res){
    const competitionId = req.params.competitionId;
    const postId = req.params.postId;
    const { password } = req.body;

    const query = `
        SELECT password FROM RecruitBoard
        WHERE competition_id = ? AND post_id = ?
    `;
    competitiondb.get(query, [competitionId, postId], (err, row) => {
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if(!row){
            res.status(404).send('Post not found');
            return;
        }
        if(row.password !== password){
            res.status(403).send('Incorrect password');
            return;
        }

        const deleteCommentQuery = `
            DELETE FROM Comment
            WHERE post_id = ?
        `;
        competitiondb.run(deleteCommentQuery, [postId], (err) => {
            if(err){
                console.error(err.message);
                res.status(500).send('Internal server error');
                return;
            }

        const deletePostQuery = `
            DELETE FROM RecruitBoard
            WHERE competition_id = ? AND post_id = ?
        `;
        competitiondb.run(deletePostQuery, [competitionId, postId], (err) => {
            if(err){
                run.status(500).send('Internal server error');
                return;
            }
            res.status(200).json({ message: 'Post deleted successfully', redirectUrl: `/compete_hub/${competitionId}/posts`});
        })
        })
    });
}

export function verifyPassword(req, res){
    const competitionId = req.params.competitionId;
    const postId = req.params.postId;
    const { password } = req.body;

    const query = `
        SELECT password FROM RecruitBoard
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
        if (row.password !== password) {
            res.status(403).send('Incorrect password');
            return;
        }
        res.status(201).json({ message: 'Password verified'});
    });

}

export function updatePostById(req, res){
    const competitionId = req.params.competitionId;
    const postId = req.params.postId;
    const { title, context, password } = req.body;

    if (!title || !context) {
        res.status(400).send('Title and context cannot be empty');
        return;
    }

    const query = `
        SELECT password FROM RecruitBoard
        WHERE competition_id = ? AND post_id = ?
    `;
    competitiondb.get(query, [competitionId, postId], (err, row) =>{
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if (!row) {
            res.status(404).send('Post not found');
            return;
        }
        if (row.password !== password) {
            res.status(403).send('Incorrect password');
            return;
        }

        const updateQuery = `
            UPDATE RecruitBoard
            SET title = ?, context = ?
            WHERE competition_id = ? AND post_id = ?
        `;
        competitiondb.run(updateQuery, [title, context, competitionId, postId], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
                return;
            }
            res.status(200).json({message: 'Post updated successfully'});
        });
    });
}