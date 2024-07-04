export const validationMiddleware = (req, res, next)=> {
    if (req.body.name === undefined) {
        console.error('Body must have the name field.');
        res.status(400).send();
    }
    if (req.body.age === undefined) {
        console.error('Body must have the age field.');
        res.status(400).send();
    }

    next();
};