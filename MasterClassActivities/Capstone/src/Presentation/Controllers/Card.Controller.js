import { catchAsync } from "../../Business/errors/cathAsync.js";
import { validateCard, validatePartialCard } from "../../Business/schemas/card.schema.js";
import { CardService } from "../../Data/Service/Card.Service.js";



export const registerCard = catchAsync(async(req,res,next) =>{
    const {hasError,errorMessages,cardData} = validateCard(req.body);
    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessages,
        })
    }
    const card = await CardService.CreateCard(cardData);
    return res.status(200).json(card)
});


export const getCards = catchAsync(async(req,res,next)=>{
    const cards = await CardService.findAllCards();
    return res.status(200).json(cards)
});

export const getCardId = catchAsync(async(req, res, next)=>{
    const { card }= req
    return res.status(200).json(card);
});


export const deleteCard = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const deleteCard = await CardService.deleteCard(id);
    if(!deleteCard) {
        return res.status(404).json({
            message:'Card not found'
        });      
    }
    res.status(200).json({
        message:'card delete successsfully',
        Card:deleteCard
    })
})


export const updateCard = catchAsync(async(req,res,next)=>{
    const {card} = req;
    const {hasError, errorMessages,cardData } = validatePartialCard(req.body);
    if(hasError){
        return res.status(404).json({
            status:'error',
            message:errorMessages
        })
    }

    const cardUpdate = await CardService.updateCard(cardData,card)
    return res.status(200).json(cardUpdate);

})