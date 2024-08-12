import { envs } from "../../config/enviroments/enviroments.js";
import { PlayerService } from "../../Data/Service/Player.Service.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/cathAsync.js";
import {promisify} from 'util'
import jwt from 'jsonwebtoken'
import { tokenService } from "../../Data/Service/TokenInvalid.Service.js";




export const validateExistPlayer = catchAsync(async(req,res,next)=>{

    const {id} = req.params;
    const player = await PlayerService.findOnePlayer(id)
    if(!player){
        return next(new AppError(`player with the id:${id} not exist`,401))
    }
    req.player = player;
    next()
});


export const validateExistPlayerRegister = catchAsync(async(req,res,next)=>{

    const {username} = req.body;
    const player = await PlayerService.findOnePlayerRegister(username)
    if(player){
        next(new AppError(`player with ${username} exist, plis other username`,401))
    }
        return next()
});


export const protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log("mi token protec",token)
    }
    console.log("mitoken",token)
    if (!token) {
        return next(new AppError("you are not logged in!. Please login to get access", 401));
    }

    if (tokenService.isTokenBlacklisted(token)) {
        return next(new AppError('This token has been invalidated', 401));
    }

    const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

    console.log("este es mi decoded", decoded);
    const player = await PlayerService.findOnePlayer(decoded.id);
    if (!player) {
        return next(new AppError('The owner of this token is no longer available', 401));
    }
    req.player = player;
    next();
});