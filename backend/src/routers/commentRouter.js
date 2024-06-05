import express from 'express';
import {
    getCommentsByPostId,
    createComment
} from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getCommentsByPostId);
router.post('/', createComment);

export default router;
