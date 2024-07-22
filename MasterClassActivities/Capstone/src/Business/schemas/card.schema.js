import z from 'zod'
import { extractValidationData } from '../errors/extractErrorData.js'

const cardSchema = z.object({
    color: z.string({
        invalid_type_error:'color must be a string',
        required_error:'color required'
    }),
    value:z.string({
        invalid_type_error:'valuemust be a string',
        required_error:'value is required'
    }),
    gameId:z.number({
        invalid_type_error:'gameId must be a number',
        required_error:'gameId is required'
    })
})

export function validateCard(data){
    const result = cardSchema.safeParse(data);

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
    const result = cardSchema.partial().safeParse(data);
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