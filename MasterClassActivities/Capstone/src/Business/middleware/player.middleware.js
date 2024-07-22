import { PlayerService } from "../../Data/Service/Player.Service.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/cathAsync.js";




export const validateExistPlayer = catchAsync(async(req,res,next)=>{

    const {id} = req.params;
    const player = await PlayerService.findOnePlayer(id)
    if(!player){
        return next(new AppError(`player with the id:${id} not exist`,401))
    }
    req.player = player;
    next()
});