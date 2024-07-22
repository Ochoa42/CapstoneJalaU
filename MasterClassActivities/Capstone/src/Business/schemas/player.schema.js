import z from 'zod';
import { extractValidationData } from '../errors/extractErrorData.js';

const playerSchema = z.object({
    name:z.string({
        invalid_type_error: 'name must be a string',
        required_error: 'name is required'
    })
        .min(1,{message:'name is too short, minimum one character'})
        .max(50,{message:'name is too long, maximum 50 characteres'}),

    age:z.number({
        invalid_type_error:'age must be a integer',
        required_error:'age is required'
    }),

    email:z.string({
        invalid_type_error:'email must be a string',
        required_error:'email is required'
    })
})

export function validatePlayer(data){
    const result = playerSchema.safeParse(data)
    const{
        hasError,
        errorMessages,
        data:playerData,
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        playerData
    }
}


export function validatePartialPlayer(data){
    const result = playerSchema.partial().safeParse(data)
    const {
        hasError,
        errorMessages,
        data:playerData,
    } = extractValidationData(result)
    return{
        hasError,
        errorMessages,
        playerData
    }
}

