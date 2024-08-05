import request from 'supertest';
import express from 'express';
import { sequelize } from '../../src/Data/Database/Connection.js';
import { router } from '../../src/Presentation/router/Player.Router.js'; // Ajusta la ruta según tu estructura de proyecto
import { PlayerService } from '../../src/Data/Service/Player.Service.js'; // Asegúrate de que la ruta sea correcta
import { GameService } from '../../src/Data/Service/Game.Service.js'; // Para pruebas relacionadas con juegos
import { playerGameService } from '../../src/Data/Service/PlayerGame.Service.js'; // Para pruebas relacionadas con la unión de juegos
import { tokenService } from '../../src/Data/Service/TokenInvalid.Service.js'; // Para pruebas relacionadas con la invalidación de tokens
import { generateJWT } from '../../src/Business/plugins/generate-jwt.plugin.js'; // Para pruebas relacionadas con la autenticación

const app = express();
app.use(express.json());
app.use('/players', router);

// Mocking services
jest.mock('../../src/Data/Service/Player.Service.js');
jest.mock('../../src/Data/Service/Game.Service.js');
jest.mock('../../src/Data/Service/PlayerGame.Service.js');
jest.mock('../../src/Data/Service/TokenInvalid.Service.js');
jest.mock('../../src/Business/plugins/generate-jwt.plugin.js');

describe('Player Controller', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Resetea la base de datos antes de las pruebas
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    afterAll(async () => {
        await sequelize.close(); // Cierra la conexión de la base de datos después de todas las pruebas
    });

    test('POST /players/register should register a new player', async () => {
        const playerData = {
            name: "John Doe",
            age: 25,
            email: "john@example.com",
            username: "john_doe",
            password: "securepassword"
        };
        PlayerService.CreatePlayer.mockResolvedValue(playerData);

        const response = await request(app)
            .post('/players/register')
            .send(playerData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
    });

    test('POST /players/login should authenticate a player', async () => {
        const loginData = {
            username: "john_doe",
            password: "securepassword"
        };
        const player = {
            id: 1,
            name: "John Doe",
            email: "john@example.com"
        };
        const token = "fake-jwt-token";
        PlayerService.findOneLogin.mockResolvedValue(player);
        generateJWT.mockResolvedValue(token);

        const response = await request(app)
            .post('/players/login')
            .send(loginData);

        expect(response.status).toBe(200);
        expect(response.body.token).toBe(token);
    });

    test('POST /players/createGame should create a game for the player', async () => {
        const gameData = {
            title: "New Game",
            status: "active",
            maxPlayers: 4,
            rules: "Some rules"
        };
        const game = { id: 1, ...gameData };
        const player = { id: 1 };
        PlayerService.findOnePlayer.mockResolvedValue(player);
        GameService.CreateGame.mockResolvedValue(game);

        const response = await request(app)
            .post('/players/createGame')
            .send(gameData)
            .set('Authorization', 'Bearer valid-token'); // Simula la autenticación

        expect(response.status).toBe(201);
        expect(response.body.game_id).toBe(1);
    });

    test('POST /players/joinGame should add a player to a game', async () => {
        const gameData = {
            game_id: 1,
            access_token: "valid-token"
        };
        const player = { id: 1 };
        const game = { id: 1 };
        const playerGame = { playerId: 1, gameId: 1 };

        decodedToken.mockResolvedValue(player);
        GameService.findOneGame.mockResolvedValue(game);
        playerGameService.findOnePlayerGame.mockResolvedValue(null); // El jugador no está en el juego
        playerGameService.createPlayerGame.mockResolvedValue(playerGame);

        const response = await request(app)
            .post('/players/joinGame')
            .send(gameData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Player joined the game successfully');
    });

    test('POST /players/logout should invalidate a player\'s token', async () => {
        const access_token = "valid-token";
        tokenService.invalidateToken.mockResolvedValue(true);

        const response = await request(app)
            .post('/players/logout')
            .send({ access_token });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User logged out successfully');
    });

    test('POST /players/profile should return player profile information', async () => {
        const token = "valid-token";
        const player = {
            username: "john_doe",
            email: "john@example.com"
        };
        decodedToken.mockResolvedValue(player);

        const response = await request(app)
            .post('/players/profile')
            .send({ access_token: token })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.username).toBe("john_doe");
        expect(response.body.email).toBe("john@example.com");
    });

    test('PATCH /players/:id should update a player', async () => {
        const playerData = {
            name: "John Updated",
            age: 26
        };
        const updatedPlayer = { id: 1, ...playerData };
        PlayerService.updatePlayer.mockResolvedValue(updatedPlayer);

        const response = await request(app)
            .patch('/players/1')
            .send(playerData)
            .set('Authorization', 'Bearer valid-token'); // Simula la autenticación

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Updated");
    });

    test('DELETE /players/:id should delete a player', async () => {
        const player = { id: 1, name: "John Doe" };
        PlayerService.deletePlayer.mockResolvedValue(player);

        const response = await request(app)
            .delete('/players/1')
            .set('Authorization', 'Bearer valid-token'); // Simula la autenticación

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Player delete successfully');
    });

    test('POST /players/register should return 422 if validation fails', async () => {
        const playerData = { name: "John Doe", age: 25 }; // Campos faltantes
        const response = await request(app)
            .post('/players/register')
            .send(playerData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    test('POST /players/joinGame should return 400 if game_id or access_token is missing', async () => {
        const gameData = { game_id: 1 }; // access_token faltante
        const response = await request(app)
            .post('/players/joinGame')
            .send(gameData);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Game ID and access token are required');
    });

    test('POST /players/joinGame should return 404 if game is not found', async () => {
        const gameData = {
            game_id: 1,
            access_token: "valid-token"
        };
        decodedToken.mockResolvedValue({ id: 1 });
        GameService.findOneGame.mockResolvedValue(null); // El juego no existe

        const response = await request(app)
            .post('/players/joinGame')
            .send(gameData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Game not found');
    });

    test('POST /players/joinGame should return 401 if token is invalid or expired', async () => {
        const gameData = {
            game_id: 1,
            access_token: "invalid-token"
        };
        decodedToken.mockResolvedValue(null); // Token no válido

        const response = await request(app)
            .post('/players/joinGame')
            .send(gameData);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid or expired token');
    });
});