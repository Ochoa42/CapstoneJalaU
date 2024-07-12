import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/cathAsync.js";
import { GameService } from "./Juego.service.js";



export const validateExistGame = catchAsync(async(req, res, next) =>{
    const {id} = req.params;
    const game = await GameService.findGame(id)
    if(!game){
        return next(new AppError(`Game with the id: ${id} not exist`,401))
    }
    req.game = game;
    next();
})
