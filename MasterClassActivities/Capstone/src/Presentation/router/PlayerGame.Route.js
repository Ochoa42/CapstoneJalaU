import express from 'express'
import { getPlayersGames } from '../Controllers/PlayerGames.Controller.js'

export const router = express.Router()

router.get('/',getPlayersGames)