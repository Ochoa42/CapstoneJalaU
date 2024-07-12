import express from 'express'
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { logger } from './modules/MyEndpoint/MyFirstEndpoint.middleware.js';


const App = express();
App.use(express.json());
App.use(express.urlencoded({extended:true}))

App.use(logger)

App.use('/actividad2/api/v1',router)

App.all('*',(req,res,next) => {
    return next(new AppError(`${req.originalUrl} not Found!`, 404));
})


export default App