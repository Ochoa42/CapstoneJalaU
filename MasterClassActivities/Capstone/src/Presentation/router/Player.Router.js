import express from 'express'
import { deletePlayer, getPlayerId, getPlayers, registerPlayer, updatePlayer } from '../Controllers/Player.Controller.js'
import { validateExistPlayer } from '../../Business/middleware/player.middleware.js'

export const router = express.Router()

router.get('/',getPlayers)
router.post('/register',registerPlayer)

router
    .route('/:id')
    .get(validateExistPlayer,getPlayerId)
    .patch(validateExistPlayer,updatePlayer)
    .delete(validateExistPlayer,deletePlayer)
    .put(validateExistPlayer,updatePlayer)