import express from 'express';
import multer from 'multer';
import {
    getTopCompetitions,
    getAllCompetitions,
    getCompetitionById,
    getTopPosts,
    addCompetition,
    addContactPerson
} from '../controllers/competitionController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/top', getTopCompetitions);
router.get('/', getAllCompetitions);
router.get('/:competitionId', getCompetitionById);
router.get('/top/posts', getTopPosts);
router.post('/', upload.single('poster'), addCompetition);
router.post('/contactperson', addContactPerson);

export default router;
