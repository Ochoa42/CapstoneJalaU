import request from 'supertest';
import express from 'express';
import { sequelize, syncUp } from '../../src/Data/Database/Connection.js';
import { router } from '../../src/Presentation/router/Game.Router.js';
import { GameService } from '../../src/Data/Service/Game.Service.js'; 
import { playerGameService } from '../../src/Data/Service/PlayerGame.Service.js';

const app = express();
app.use(express.json());
app.use('/games', router);

// Mocking GameService
jest.mock('../../src/Data/Service/Game.Service.js');

describe('Game Controller', () => {
    beforeAll(async () => {
        await syncUp();  // Sincroniza la base de datos antes de las pruebas
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    afterAll(async () => {
        await sequelize.close();  // Cierra la conexión después de las pruebas
    });

    test('POST /games/register should create a game', async () => {
        const gameData = {
            title: "New Game",
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
        expect(response.body.message).toBe('Game deleted successfully');
    })

    test('POST /games/register should return 422 if validation fails', async () => {
        const gameData = { title: "New Game", status: "active" }; 
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

    test('POST /games/start should start a game', async () => {
        const game_id = 1;
        const access_token = 'valid_token';
        
        // Mocking decodedToken to return a valid player
        jest.mock('../../src/config/Utils/DecodedToken.js', () => ({
            decodedToken: jest.fn().mockResolvedValue({ id: 1 })
        }));
    
        GameService.startGame.mockResolvedValue();
    
        const response = await request(app)
            .post('/games/start')
            .send({ game_id, access_token });
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Game started successfully");
    });
    
    test('POST /games/start should return 400 if startGame fails', async () => {
        const game_id = 1;
        const access_token = 'valid_token';
    
        jest.mock('../../src/config/Utils/DecodedToken.js', () => ({
            decodedToken: jest.fn().mockResolvedValue({ id: 1 })
        }));
    
        GameService.startGame.mockRejectedValue(new Error("Failed to start game"));
    
        const response = await request(app)
            .post('/games/start')
            .send({ game_id, access_token });
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Failed to start game");
    });

    test('GET /games/:id/status should return the status of a game', async () => {
        const game = { id: 1, status: "active" };
    
        GameService.findOneGame.mockResolvedValue(game);
    
        const response = await request(app).get('/games/1/status');
    
        expect(response.status).toBe(200);
        expect(response.body.game_id).toBe(1);
        expect(response.body.status).toBe("active");
    });

    test('GET /games/:id/players should return all players of a game', async () => {
        const players = [
            { id: 1, name: "Player 1" },
            { id: 2, name: "Player 2" }
        ];
    
        playerGameService.findPlayersByGameId.mockResolvedValue(players);
    
        const response = await request(app).get('/games/1/players');
    
        expect(response.status).toBe(200);
        expect(response.body.players.length).toBe(2);
        expect(response.body.players[0].name).toBe("Player 1");
    });
    
    test('GET /games/:id/players should return 404 if no players found', async () => {
        playerGameService.findPlayersByGameId.mockResolvedValue([]);
    
        const response = await request(app).get('/games/1/players');
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No players found for this game');
    });
});