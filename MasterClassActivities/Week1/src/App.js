import express from 'express'
import { router } from './Routes/index.js';
import { AppError } from './common/errors/appError.js';


const App = express();

App.use(express.json());
App.use(express.urlencoded({extended:true}));

App.use('/juego/api/v1',router)

App.all('*',(req,res,next) =>{
    return next(new AppError(`${req.originalUrl} not found`,404));
})

export default App