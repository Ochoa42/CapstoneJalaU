import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';


export const generateJWT = (id ,name, email) => {
    return new Promise((resolve, reject) => {
        const payload = {id ,name, email };

        jwt.sign(
            payload,
            envs.SECRET_JWT_SEED,
            {
                expiresIn: envs.JWT_EXPIRE_IN,
            },
            
            (err,token) => {
                if(err) reject(err);
                resolve(token)
            }
        );
    });
};
