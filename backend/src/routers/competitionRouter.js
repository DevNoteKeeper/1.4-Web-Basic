import express from 'express';
import {
    getTopCompetitions,
    getAllCompetitions,
    getCompetitionById,
    getTopPosts
} from '../controllers/competitionController.js';

const router = express.Router();

router.get('/top', getTopCompetitions);
router.get('/', getAllCompetitions);
router.get('/:competitionId', getCompetitionById);
router.get('/top/posts', getTopPosts);

export default router;