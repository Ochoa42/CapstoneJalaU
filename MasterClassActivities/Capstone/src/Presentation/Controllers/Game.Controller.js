import { catchAsync } from "../../Business/errors/cathAsync.js";
import { validateGame, validatePartialGame } from "../../Business/schemas/game.schemas.js";
import { decodedToken } from "../../config/Utils/DecodedToken.js";
import { GameService } from "../../Data/Service/Game.Service.js";
import { playerGameService } from "../../Data/Service/PlayerGame.Service.js";



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

    console.log("mi game data",gameData)
    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessages
        })
    }
    const game = await GameService.CreateGame(gameData)
    console.log("mi game data2",game)
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
        message:'Game deleted successfully',
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
        return res.status(400).json({ message:"Failed to start game"});
    }
});

export const getStatusGame = catchAsync(async(req,res,next)=>{
    const {game} = req
    return res.status(200).json({
        game_id:game.id,
        status:game.status
    })
})


export const getAllPlayerofGames = catchAsync(async(req,res,next)=>{
    const { game } = req;   
    const players = await playerGameService.findPlayersByGameId(game.id);       
    if (!players.length) {
        return res.status(404).json({
            status: 'error',
            message: 'No players found for this game'
        });
    }
    return res.status(200).json({
        game_Id:game.id,
        players
    });
});

