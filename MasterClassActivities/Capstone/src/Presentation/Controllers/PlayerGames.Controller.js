import { catchAsync } from "../../Business/errors/cathAsync.js";
import { playerGameService } from "../../Data/Service/PlayerGame.Service.js";


export const getPlayersGames = catchAsync(async(req,res,next)=>{
    const players = await playerGameService.findAllPlayerGame();
    return res.status(200).json(players);
})