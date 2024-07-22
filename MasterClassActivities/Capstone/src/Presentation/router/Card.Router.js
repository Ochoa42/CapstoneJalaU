import express from 'express';
import { validateExistCard } from '../../Business/middleware/card.middleware.js';
import { deleteCard, getCardId, getCards, registerCard, updateCard } from '../Controllers/Card.Controller.js';


export const router = express.Router()

router.get('/',getCards)
router.post('/register',registerCard)

router
    .route('/:id')
    .get(validateExistCard,getCardId)
    .patch(validateExistCard,updateCard)
    .delete(validateExistCard,deleteCard)
    .put(validateExistCard,updateCard)