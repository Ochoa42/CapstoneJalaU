import express from 'express'
import { router as MyFirstEndpoint} from '../modules/MyEndpoint/MyFirstEndpoint.route.js'


export const router = express.Router();

router.use('/MyFirstEndpoint',MyFirstEndpoint);






