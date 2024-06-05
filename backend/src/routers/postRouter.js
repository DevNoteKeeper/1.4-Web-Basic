import express from 'express';
import {
    getPostsByCompetitionId,
    createRecruitmentPost,
    getPostById
} from '../controllers/postController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getPostsByCompetitionId);
router.post('/recruitment', createRecruitmentPost);
router.get('/:postId', getPostById);

export default router;
