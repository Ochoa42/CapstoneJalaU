import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerSchema = z.object({
    name: z.string({
        invalid_type_error:'name must be a string',
        required_error:'name is required',
    })
    .min(1,{message:'name is too short, minimo 3 characters'})
    .max(50,{message: 'name is too long, maximo 50 caracteres'}),

    description:z.string()
    .min(1,{message:'description is too short, minimo 1 characters'})
    .max(50,{message:'description is too long, maximo 50 caracteres'}),

    genre:z.enum(['Adventure','Racing','otro']),

    platform:z.enum(['Mobile','PC'])
});

export function validateJuego(data) {
    const result = registerSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data:gameData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        gameData,
    };
}

export function validatePartialJuego(data) {
    const result = registerSchema.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: gameData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        gameData,
    };
}


