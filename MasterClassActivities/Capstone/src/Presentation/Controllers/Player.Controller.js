import { catchAsync } from "../../Business/errors/cathAsync.js";
import { generateJWT } from "../../Business/plugins/generate-jwt.plugin.js";
import { validatePartialGame } from "../../Business/schemas/game.schemas.js";
import { validatePartialPlayer, validatePlayer } from "../../Business/schemas/player.schema.js";
import { decodedToken } from "../../config/Utils/DecodedToken.js";
import { GameService } from "../../Data/Service/Game.Service.js";
import { PlayerService } from "../../Data/Service/Player.Service.js";
import { playerGameService } from "../../Data/Service/PlayerGame.Service.js";
import { tokenService } from "../../Data/Service/TokenInvalid.Service.js";

export const getPlayers = catchAsync(async(req,res,next)=>{
    const players = await PlayerService.findAllPlayers();
    return res.status(200).json(players);
})

export const getPlayerId = catchAsync(async(req,res,next)=>{
    const {player} = req
    return res.status(200).json(player)
})

export const registerPlayer = catchAsync(async(req,res,next)=>{
    const {hasError,errorMessages,playerData} = validatePlayer(req.body)
    
    if(hasError){
        return res.status(200).json({
            status:'error',
            message:errorMessages
        })
    }

    const player = await PlayerService.CreatePlayer(playerData);

    return res.status(200).json(player);
})


export const loginPlayer = catchAsync(async(req,res,next)=>{
    console.log("mi req body",req.body)
    const {hasError , errorMessages, playerData} = validatePartialPlayer(req.body);
    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessages
        });
    }
    console.log("este es mi playerData",req.body)
    const player = await PlayerService.findOneLogin(playerData.username,playerData.password)
    if(!player){
        return res.status(200).json({
            error:'invalid credentials',
        })
    }
    const token = await generateJWT(player.id ,player.name, player.email);
    return res.status(200).json({
        token:token,
        message:"Player is Authenticated Successfuly"

    })
});

export const CreateGame = catchAsync(async(req,res,next)=>{

    const { hasError, errorMessages, gameData } = validatePartialGame(req.body)
    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessages
        });
    }

    const game = await GameService.CreateGame({
        title: gameData.title,
        status: gameData.status,
        maxPlayers: gameData.maxPlayers,
        rules: gameData.rules,
        playerId: req.player.id 
    });

    return res.status(201).json({
        message: 'Create Game successfuly',
        game_id: game.id
    });
});


export const joinGame = catchAsync(async (req, res, next) => {
    const { game_id, access_token } = req.body;

    if (!game_id || !access_token) {
        return res.status(400).json({
            status: 'error',
            message: 'Game ID and access token are required'
        });
    }

    const player = await decodedToken(access_token);
    if (!player) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token'
        });
    }

    const playerId = player.id;

    // Verificar si el juego existe
    const game = await GameService.findOneGame(game_id);
    if (!game) {
        return res.status(404).json({
            status: 'error',
            message: 'Game not found'
        });
    }

    // Verificar si el usuario ya está en el juego
    const isUserInGame = await playerGameService.findOnePlayerGame(playerId, game.id);
    if (isUserInGame) {
        return res.status(400).json({
            status: 'error',
            message: 'player is already in the game'
        });
    }
    

    // Agregar al usuario al juego
    const AddJoinGame = await playerGameService.createPlayerGame({
        playerId:playerId,
        gameId:game.id
    });

    if (!AddJoinGame) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to add player to the game'
        });
    }

    return res.status(200).json({
        message: 'Player joined the game successfully'
    });
});


export const logoutPlayer = catchAsync(async (req, res, next) => {
    const { access_token } = req.body;

    if (!access_token) {
        return res.status(400).json({
            status: 'error',
            message: 'Access token is required'
        });
    }

    const invalidated = tokenService.invalidateToken(access_token);

    if (!invalidated) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to invalidate token'
        });
    }

    return res.status(200).json({
        message: 'User logged out successfully'
    });
});

 export const getUserProfile = catchAsync(async(req,res,next)=>{
    const {access_token} = req.body
    if (!access_token) {
        return res.status(400).json({
            status: 'error',
            message: 'Access token is required'
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    console.log("mi token controller",token)
    if(access_token != token){
        return res.status(400).json({
            status: 'error',
            message: 'invalid user token'
        });
    }
    const player = await decodedToken(token);
    return res.status(200).json({
        username: player.username,
        email:player.email
    })

 })

export const updatePlayer = catchAsync(async(req,res,next)=>{

    const {player} = req
    const {hasError,errorMessages,playerData}=validatePartialPlayer(req.body)
    if(hasError){
        return res.status(200).json({
            status:'error',
            message:errorMessages
        })
    }

    const playerUpdate = await PlayerService.updatePlayer(playerData,player);
    return res.status(200).json(playerUpdate)

})


export const deletePlayer = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const playerDelete = await PlayerService.deletePlayer(id);
    if(!playerDelete){
        return res.status(200).json({
            status:'error',
            message:'Player Not found'
        })
    }
    return res.status(200).json({
        message:'Player delete successfully',
        player:playerDelete
    });
});

export const RemovePlayerofGameInProgess = catchAsync(async(req,res,next)=>{
    const { game_id, access_token } = req.body;
    const game = await GameService.findOneGame(game_id);
    if (!game || game.status !== "active") {
        return res.status(400).json({ message: "Game does not exist or is not in progress" });
    }
    const player = await decodedToken(access_token);
    if (!player) {
        return res.status(400).json({ message: "Player does not exist or token is invalid" });
    }
    const gamePlayer = await playerGameService.findOnePlayerGame(player.id, game.id);
    if (!gamePlayer) {
        return res.status(400).json({ message: "Player is not part of the game" });
    }
    await playerGameService.DeleteGamePlayer(player.id, game.id);
    return res.status(200).json({ message: "User left the game successfully" });
});


export const endGame = catchAsync(async (req, res, next) => {
    const { game_id, access_token } = req.body;
    if (!game_id || !access_token) {
        return res.status(400).json({
            status: 'error',
            message: 'Game ID and access token are required'
        });
    }
    const player = await decodedToken(access_token);
    if (!player) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token'
        });
    }
    const game = await GameService.findOneGame(game_id);
    if (!game) {
        return res.status(404).json({
            status: 'error',
            message: 'Game not found'
        });
    }
    if (game.status !== "active") {
        return res.status(400).json({
            status: 'error',
            message: 'Game is not in progress'
        });
    }
    if (game.playerId !== player.id) {
        return res.status(403).json({
            status: 'error',
            message: 'You are not authorized to end this game'
        });
    }
    await GameService.updateGame({ status: 'inactive' },game);
    return res.status(200).json({
        message: 'Game ended successfully'
    });
});