import { playerGameService } from "../../Data/Service/PlayerGameService.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/cathAsync.js";




export const validateExistPlayerGame = catchAsync(async(req,res,next)=>{

    const {playerId,gameId} = req.params;
    const playerGame = await playerGameService.findOnePlayerGame(playerId,gameId)
    if(!playerGame){
        return next(new AppError(`Player and Game with the id:${id} not exist`,401))
    }
    req.playerGame = playerGame;
    next()
});