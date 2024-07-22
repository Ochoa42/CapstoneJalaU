import express from 'express'
import { AppError } from './Business/errors/appError.js';
import { router } from './Presentation/router/RouterBase.js';

const App = express();

App.use(express.json())
App.use(express.urlencoded({extended:true}));

App.use('/juego/v1/api',router)
App.all('*',(req,res,next) =>{
    return next(new AppError(`${req.originalUrl} not found`,404))
})


export default App;