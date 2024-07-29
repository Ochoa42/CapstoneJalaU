import { catchAsync } from "../../Business/errors/cathAsync.js";
import { generateJWT } from "../../Business/plugins/generate-jwt.plugin.js";
import { validatePartialGame } from "../../Business/schemas/game.schemas.js";
import { validatePartialPlayer, validatePlayer } from "../../Business/schemas/player.schema.js";
import { decodedToken } from "../../config/Utils/DecodedToken.js";
import { GameService } from "../../Data/Service/Game.Service.js";
import { PlayerService } from "../../Data/Service/Player.Service.js";
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
        game
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
})