import { ScoreService } from "../../Data/Service/Score.Service.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/cathAsync.js";




export const validateExistScore = catchAsync(async(req,res,next)=>{

    const {id} = req.params;
    const score = await ScoreService.findOneScore(id)
    if(!score){
        return next(new AppError(`score with the id:${id} not exist`,401))
    }
    req.score = score;
    next()
});