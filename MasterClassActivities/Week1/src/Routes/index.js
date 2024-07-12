import express from 'express';
import { router as GameRouter } from '../Module/Juego/Juego.route.js';

export const router = express.Router();

router.use('/administrador',GameRouter);