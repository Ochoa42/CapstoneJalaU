import express from 'express';
import { createPerson } from './personController.js';
import { validationMiddleware } from './middleware/validations.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next)=> {
    console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
});

app.use('/api/person', validationMiddleware);

app.post('/api/person',(req, res, next)=>{
    const person = createPerson(req.body);
    res.json(person); 
});

app.get('/api/person', (req, res, next) => {
    res.json(people);
});


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});