import jwt from 'jsonwebtoken'
import { envs } from '../enviroments/enviroments.js';
import { PlayerService } from '../../Data/Service/Player.Service.js';
import {promisify} from 'util'

export const decodedToken = async (token) => {
    try {
        const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);
        const player = await PlayerService.findOnePlayer(decoded.id);
        return player;
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token');
    }
};