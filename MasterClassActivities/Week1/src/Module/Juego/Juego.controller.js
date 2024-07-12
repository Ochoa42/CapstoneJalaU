import { catchAsync } from "../../common/errors/cathAsync.js";
import { validateJuego, validatePartialJuego } from "./Juego.schema.js";
import { GameService } from "./Juego.service.js";


export const traerJuego = async(req, res, next) => {
    return res.status(200).json({
        hola:'hola'
    })
}


export const GetGameId = catchAsync(async(req, res, next) => {
    const {game} = req;
    return res.status(200).json(game);
});

export const GetGames = catchAsync(async(req, res, next) => {
    const game = await GameService.findAllGames();
    return res.status(200).json(game)
});

export const RegisterGame = catchAsync(async(req, res, next) => {
    const {hasError, errorMessage, gameData} = validateJuego(req.body);
    console.log(req.body.juego)
    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessage,
        });
    }
    const game = await GameService.createGame(gameData);
    return res.status(200).json(game)
});


export const UpdateGame = catchAsync(async(req,res,next) =>{
    const {game} = req;
    const{hasError,errorMessage,gameData} = validatePartialJuego(req.body);
    if(hasError){
        return res.status(422).json({
            status:'error',
            message:errorMessage
        })
    }
    const gameUpdated = await GameService.updateGame(game,gameData)
    return res.status(200).json(gameUpdated)
});

export const deleteGame = catchAsync(async(req, res, next) =>{
    const { id } = req.params; 
    const deletedGame = await GameService.deleteGame(id);
    if (!deletedGame) {
        return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully', game: deletedGame });

});