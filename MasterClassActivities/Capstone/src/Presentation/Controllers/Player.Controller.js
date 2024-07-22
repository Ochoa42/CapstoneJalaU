import { catchAsync } from "../../Business/errors/cathAsync.js";
import { validatePartialPlayer, validatePlayer } from "../../Business/schemas/player.schema.js";
import { PlayerService } from "../../Data/Service/Player.Service.js";

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