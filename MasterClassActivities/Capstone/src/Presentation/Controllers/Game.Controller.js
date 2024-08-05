import { catchAsync } from "../../Business/errors/cathAsync.js";
import { validateGame, validatePartialGame } from "../../Business/schemas/game.schemas.js";
import { decodedToken } from "../../config/Utils/DecodedToken.js";
import { GameService } from "../../Data/Service/Game.Service.js";



export const getGames = catchAsync(async(req,res,next)=>{
    const games = await GameService.findAllGames();
    return res.status(200).json(games)
})


export const getGameId = catchAsync(async(req,res,next)=>{
    const {game} = req
    return res.status(200).json(game)
})


export const registerGame = catchAsync(async(req,res,next)=>{
    const {hasError,errorMessages,gameData}=validateGame(req.body)

    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessages
        })
    }
    const game = await GameService.CreateGame(gameData)
    return res.status(200).json({
        message:"Game created successfully",
        "game_Id":game.id
    })
})


export const updateGame = catchAsync(async(req,res,next)=>{
    
    const {game} = req
    const {hasError,errorMessages,gameData} = validatePartialGame(req.body);

    if(hasError){
        res.status(422).json({
            status:'error',
            message:errorMessages
        })
    }

    const gameUpdate = await GameService.updateGame(gameData,game);
    return res.status(200).json(gameUpdate);
})


export const deleteGame = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const deleteGame = await GameService.deleteGame(id)
    if(!deleteGame){
        return res.status(404).json({
            message:'Game no found'
        })
    }
    return res.status(200).json({
        message:'Game delete successfully',
        game: deleteGame
    })
})

export const startGame = catchAsync(async (req, res, next) => {
    const { game_id, access_token } = req.body;
    const player = await decodedToken(access_token)
    const playerId = player.id;
    try {
        await GameService.startGame(game_id, playerId);
        return res.status(200).json({ message: "Game started successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});