import z from 'zod'
import { extractValidationData } from '../errors/extractErrorData.js'

const playerGameSchema = z.object({
    playerId:z.number({
        invalid_type_error:'gameId must be a number',
        required_error:'playerId is required'
    }),
    gameId:z.number({
        invalid_type_error:'gameId must be a number',
        required_error:'gameId is required'
    })
})

export function validateCard(data){
    const result = playerGameSchema.safeParse(data);

    const{
        hasError,
        errorMessages,
        data:cardData,
    } = extractValidationData(result);
    return {
        hasError,
        errorMessages,
        cardData,
    }
}

export function validatePartialCard(data){
    const result = playerGameSchema.partial().safeParse(data);
    const{
        hasError,
        errorMessages,
        data:cardData,
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        cardData,
    }
}