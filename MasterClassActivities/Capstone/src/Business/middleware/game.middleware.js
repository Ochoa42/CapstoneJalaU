import { GameService } from "../../Data/Service/Game.Service.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/cathAsync.js";




export const validateExistGame = catchAsync(async(req,res,next)=>{

    const {id} = req.params;
    const game = await GameService.findOneGame(id)
    if(!game){
        return next(new AppError(`game with the id:${id} not exist`,401))
    }
    req.game = game;
    next()
});