import express from 'express';
import { router as PlayerRouter } from '../router/Player.Router.js';
import { router as ScoreRouter } from '../router/Score.Router.js';
import { router as GameRouter } from '../router/Game.Router.js';
import { router as CardRouter } from '../router/Card.Router.js';
import { router as PlayerGameRouter } from './PlayerGame.Route.js';

export const router = express.Router();

router.use('/players',PlayerRouter);
router.use('/scores',ScoreRouter);
router.use('/games',GameRouter);
router.use('/cards',CardRouter);
router.use('/playerGame',PlayerGameRouter)