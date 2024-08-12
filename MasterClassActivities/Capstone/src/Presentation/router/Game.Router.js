import express from 'express';
import { validateExistGame } from '../../Business/middleware/game.middleware.js';
import { getGames,getGameId, registerGame, updateGame, deleteGame, getStatusGame, getAllPlayerofGames } from '../Controllers/Game.Controller.js';


export const router = express.Router()

router.get('/',getGames)
router.post('/register',registerGame)
router.get('/status/:id',validateExistGame,getStatusGame)
router.get('/getPlayerOfGame/:id',validateExistGame,getAllPlayerofGames)
router
    .route('/:id')
    .get(validateExistGame,getGameId)
    .patch(validateExistGame,updateGame)
    .delete(validateExistGame,deleteGame)
    .put(validateExistGame,updateGame)