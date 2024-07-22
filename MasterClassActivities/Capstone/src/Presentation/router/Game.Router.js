import express from 'express';
import { validateExistGame } from '../../Business/middleware/game.middleware.js';
import { getGames,getGameId, registerGame, updateGame, deleteGame } from '../Controllers/Game.Controller.js';


export const router = express.Router()

router.get('/',getGames)
router.post('/register',registerGame)

router
    .route('/:id')
    .get(validateExistGame,getGameId)
    .patch(validateExistGame,updateGame)
    .delete(validateExistGame,deleteGame)
    .put(validateExistGame,updateGame)