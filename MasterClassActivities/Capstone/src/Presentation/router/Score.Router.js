import express from 'express';
import { validateExistScore } from '../../Business/middleware/score.middleware.js';
import { getScores,getScoreId, registerScore, updateScore, deleteScore } from '../Controllers/Score.Controller.js';


export const router = express.Router()

router.get('/',getScores)
router.post('/register',registerScore)

router
    .route('/:id')
    .get(validateExistScore,getScoreId)
    .patch(validateExistScore,updateScore)
    .delete(validateExistScore,deleteScore)
    .put(validateExistScore,updateScore)