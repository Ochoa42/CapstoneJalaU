import z from 'zod'
import { extractValidationData } from '../errors/extractErrorData.js'

const scoreSchema = z.object({
    playerId: z.number({
        invalid_type_error:'playerId must be a number',
        required_error:'playerId required'
    }),
    gameId:z.number({
        invalid_type_error:'gameId must be a number',
        required_error:'gameId is required'
    }),
    score:z.number({
        invalid_type_error:'score must be a number',
        required_error:'score is required'
    })
})

export function validateScore(data){
    const result = scoreSchema.safeParse(data);

    const{
        hasError,
        errorMessages,
        data:scoreData,
    } = extractValidationData(result);
    return {
        hasError,
        errorMessages,
        scoreData,
    }
}

export function validatePartialScore(data){
    const result = scoreSchema.partial().safeParse(data);
    const{
        hasError,
        errorMessages,
        data:scoreData,
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        scoreData,
    }
}