import express from 'express';
import { deleteGame, GetGameId, GetGames, RegisterGame, UpdateGame } from './Juego.controller.js';
import { validateExistGame } from './Juego.middleware.js';

export const router = express.Router()

router.get('/',GetGames)
router.post('/register',RegisterGame)

router
    .route('/:id')
    .get(validateExistGame,GetGameId)
    .patch(validateExistGame,UpdateGame)
    .delete(validateExistGame,deleteGame)
    .put(validateExistGame,UpdateGame)