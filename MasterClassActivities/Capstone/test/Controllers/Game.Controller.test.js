import request from 'supertest';
import express from 'express';
import { sequelize } from '../../src/Data/Database/Connection.js';
import { router } from '../../src/Presentation/router/Game.Router.js'; // Ajusta la ruta según tu estructura de proyecto
import { GameService } from '../../src/Data/Service/Game.Service.js'; // Asegúrate de que la ruta sea correcta

const app = express();
app.use(express.json());
app.use('/games', router);

// Mocking GameService
jest.mock('../../src/Data/Service/Game.Service.js');

describe('Game Controller', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Resetea la base de datos antes de las pruebas
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    afterAll(async () => {
        await sequelize.close(); // Cierra la conexión de la base de datos después de todas las pruebas
    });

    test('POST /games/register should create a game', async () => {
        const gameData = {
            title: "New Game",
            status: "active",
            maxPlayers: 4,
            rules: "Some rules"
        };
        GameService.CreateGame.mockResolvedValue({ id: 1, ...gameData });

        const response = await request(app)
            .post('/games/register')
            .send(gameData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Game created successfully");
        expect(response.body.game_Id).toBe(1);
    });

    test('GET /games should return all games', async () => {
        const games = [
            { id: 1, title: "New Game", status: "active", maxPlayers: 4, rules: "Some rules" }
        ];
        GameService.findAllGames.mockResolvedValue(games);

        const response = await request(app).get('/games');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe("New Game");
    });

    test('GET /games/:id should return a game by id', async () => {
        const game = { id: 1, title: "New Game", status: "active", maxPlayers: 4, rules: "Some rules" };
        GameService.findOneGame.mockResolvedValue(game);

        const response = await request(app).get('/games/1');

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("New Game");
    });

    test('PATCH /games/:id should update a game', async () => {
        const gameUpdate = { title: "Updated Game" };
        const updatedGame = { id: 1, title: "Updated Game", status: "active", maxPlayers: 4, rules: "Some rules" };
        GameService.updateGame.mockResolvedValue(updatedGame);

        const response = await request(app)
            .patch('/games/1')
            .send(gameUpdate);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Updated Game");
    });

    test('DELETE /games/:id should delete a game', async () => {
        GameService.deleteGame.mockResolvedValue({ id: 1 });

        const response = await request(app).delete('/games/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Game delete successfully');
    });

    test('POST /games/register should return 422 if validation fails', async () => {
        const gameData = { title: "New Game", status: "active" }; // Campos faltantes
        const response = await request(app)
            .post('/games/register')
            .send(gameData);

        expect(response.status).toBe(422);
        expect(response.body.message).toBeDefined();
    });

    test('DELETE /games/:id should return 404 if game is not found', async () => {
        GameService.deleteGame.mockResolvedValue(null);

        const response = await request(app).delete('/games/999');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Game no found');
    });
});