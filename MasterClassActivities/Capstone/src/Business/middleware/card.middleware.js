import { CardService } from "../../Data/Service/Card.Service.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/cathAsync.js";




export const validateExistCard = catchAsync(async(req,res,next)=>{

    const {id} = req.params;
    const card = await CardService.findOneCard(id)
    if(!card){
        return next(new AppError(`card with the id:${id} not exist`,401))
    }
    req.card = card;
    next()
});