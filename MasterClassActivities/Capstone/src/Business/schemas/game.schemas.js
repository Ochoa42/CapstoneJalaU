import z from 'zod';
import { extractValidationData } from '../errors/extractErrorData.js';


const gameSchema = z.object({
    title: z.string({
        invalid_type_error: 'title must be a string',
        required_error: 'title is required'
    }),
    status: z.enum(['active', 'inactive'], {
        invalid_type_error: 'status must be either "active" or "inactive"',
        required_error: 'status is required'
    }),
    maxPlayers: z.number({
        invalid_type_error: 'maxPlayers must be a number',
        required_error: 'maxPlayers is required'
    }),
    rules:z.string({
        invalid_type_error: 'rules must be a string',
        required_error: 'rules is required'
    }),
});


export function validateGame(data){

    const result = gameSchema.safeParse(data);
    const {
        hasError,
        errorMessages,
        data:gameData,
    } = extractValidationData(result);
    return {
        hasError,
        errorMessages,
        gameData,
    }
}

export function validatePartialGame(data){
    const result = gameSchema.partial().safeParse(data)
    const {
        hasError,
        errorMessages,
        data:gameData,
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        gameData,
    }
}