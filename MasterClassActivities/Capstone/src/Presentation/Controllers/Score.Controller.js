import { catchAsync } from "../../Business/errors/cathAsync.js";
import { validatePartialScore, validateScore } from "../../Business/schemas/score.schema.js";
import { ScoreService } from "../../Data/Service/Score.Service.js"




export const getScores = catchAsync(async(req,res,next)=>{
    const scores = await ScoreService.findAllScores();
    return res.status(200).json(scores);
})

export const getScoreId = catchAsync(async(req,res,next)=>{
    const {score} = req;
    return res.status(200).json(score)
})

export const registerScore = catchAsync(async(req,res,next)=>{
    const {hasError,errorMessages,scoreData}=validateScore(req.body);
    if(hasError){
        return res.status(200).json({
            status:'error',
            message:errorMessages
        })
    }

    const score = await ScoreService.CreateScore(scoreData);
    return res.status(200).json(score);
})

export const updateScore = catchAsync(async(req,res,next)=>{
    const {score} = req
    const {hasError,errorMessages,scoreData} = validatePartialScore(req.body);
    if(hasError){
        return res.status(200).json({
            status:'error',
            message:errorMessages
        })
    }
    const scoreUpdate = await ScoreService.updateScore(scoreData,score);
    return res.status(200).json(scoreUpdate) 

})

export const deleteScore = catchAsync(async(req,res,next)=>{

    const {id} = req.params;
    const deleteScore = await ScoreService.deleteScore(id);
    if(!deleteScore){
        return res.status(200).json({
            status:'error',
            message:'Score not found'
        })
    }

    return res.status(200).json({
        message:'Score Delete successfully',
        score:deleteScore
    })
})