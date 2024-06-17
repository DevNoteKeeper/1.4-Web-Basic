import express from 'express';
import {
    getPostsByCompetitionId,
    createRecruitmentPost,
    getPostById,
    deletePostById,
    verifyPassword,
    updatePostById
} from '../controllers/postController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getPostsByCompetitionId);
router.post('/recruitment', createRecruitmentPost);
router.get('/:postId', getPostById);
router.delete('/:postId', deletePostById);
router.post('/:postId/verify', verifyPassword);
router.put('/:postId', updatePostById);

export default router;
