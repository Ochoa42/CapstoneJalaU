import request from 'supertest';
import express from 'express';
import { sequelize } from '../../src/Data/Database/Connection.js';
import { router } from '../../src/Presentation/router/Card.Router.js';
import { CardService } from '../../src/Data/Service/Card.Service.js';

const app = express();
app.use(express.json());
app.use('/cards', router);

// Mocking CardService
jest.mock('../../src/Data/Service/Card.Service.js');

describe('Card Controller', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); 
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await sequelize.close(); 
    });

    test('POST /cards/register should create a card', async () => {
        const cardData = { color: "blue", value: "10p", gameId: 3 };
        CardService.CreateCard.mockResolvedValue({ id: 1, ...cardData });

        const response = await request(app)
            .post('/cards/register')
            .send(cardData);

        expect(response.status).toBe(200);
        expect(response.body.color).toBe("blue");
        expect(response.body.value).toBe("10p");
    });

    test('GET /cards should return all cards', async () => {
        const cards = [{ id: 1, color: "blue", value: "10p", gameId: 3 }];
        CardService.findAllCards.mockResolvedValue(cards);

        const response = await request(app).get('/cards');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].color).toBe("blue");
    });

    test('GET /cards/:id should return a card by id', async () => {
        const card = { id: 1, color: "blue", value: "10p", gameId: 3 };
        CardService.findOneCard.mockResolvedValue(card);

        const response = await request(app).get('/cards/1');

        expect(response.status).toBe(200);
        expect(response.body.color).toBe("blue");
    });

    test('DELETE /cards/:id should delete a card', async () => {
        CardService.deleteCard.mockResolvedValue({ id: 1 });

        const response = await request(app).delete('/cards/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('card delete successsfully');
    });

    test('PATCH /cards/:id should update a card', async () => {
        const cardUpdate = { color: "red" };
        const updatedCard = { id: 1, color: "red", value: "10p", gameId: 3 };
        CardService.updateCard.mockResolvedValue(updatedCard);

        const response = await request(app)
            .patch('/cards/1')
            .send(cardUpdate);

        expect(response.status).toBe(200);
        expect(response.body.color).toBe("red");
    });

    test('POST /cards/register should return 422 if validation fails', async () => {
        const cardData = { color: "blue" }; 
        const response = await request(app)
            .post('/cards/register')
            .send(cardData);

        expect(response.status).toBe(422);
        expect(response.body.message).toBeDefined();
    });

    test('DELETE /cards/:id should return 404 if card is not found', async () => {
        CardService.deleteCard.mockResolvedValue(null);

        const response = await request(app).delete('/cards/999');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Card not found');
    });
});