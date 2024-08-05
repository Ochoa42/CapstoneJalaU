import { GameService } from "../../src/Data/Service/Game.Service.js";
import SequelizeMock from 'sequelize-mock';

jest.mock('../../src/Business/Models/Game.Model.js', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const gameMock = DBConnectionMock.define('games', {
        id: 1,
        title: "Test Game",
        status: "active",
        maxPlayers: 4,
        rules: "Some rules",
        playerId: 1
    });

    gameMock.findByPk = jest.fn().mockImplementation((id) => {
        if (id === 1) {
            return gameMock.build({
                id: 1,
                title: "Test Game",
                status: "active",
                maxPlayers: 4,
                rules: "Some rules",
                playerId: 1
            });
        }
        return null;
    });

    gameMock.findOne = jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
            return gameMock.build({
                id: 1,
                title: "Test Game",
                status: "active",
                maxPlayers: 4,
                rules: "Some rules",
                playerId: 1
            });
        }
        return null;
    });

    gameMock.findAll = jest.fn().mockImplementation(() => {
        return [gameMock.build({
            id: 1,
            title: "Test Game",
            status: "active",
            maxPlayers: 4,
            rules: "Some rules",
            playerId: 1
        })];
    });

    gameMock.create = jest.fn().mockImplementation((data) => {
        return gameMock.build({
            id: 2,
            ...data
        });
    });

    return gameMock;
});

describe('GameService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findOneGame should return one game', async () => {
        const game = await GameService.findOneGame(1);
        expect(game).not.toBeNull();
        expect(game.id).toBe(1);
    });

    test('findOneGame should return null if game is not found', async () => {
        const game = await GameService.findOneGame(999);
        expect(game).toBeNull();
    });

    test('findAllGames should return all games', async () => {
        const games = await GameService.findAllGames();
        expect(games).not.toBeNull();
        expect(games.length).toBeGreaterThan(0);
    });

    test('findAllGames should return an empty array if no games are found', async () => {
        const gameMock = require('../../src/Business/Models/Game.Model.js');
        gameMock.findAll.mockImplementationOnce(() => []);
        const games = await GameService.findAllGames();
        expect(games).toEqual([]);
    });

    test('createGame should create a game', async () => {
        const newGame = { title: "New Game", status: "active", maxPlayers: 5, rules: "New rules", playerId: 2 };
        const game = await GameService.CreateGame(newGame);
        expect(game).not.toBeNull();
        expect(game.title).toBe("New Game");
    });

    test('createGame should throw an error if data is invalid', async () => {
        const gameMock = require('../../src/Business/Models/Game.Model.js');
        gameMock.create.mockImplementationOnce(() => {
            throw new Error('Invalid data');
        });
        await expect(GameService.CreateGame({})).rejects.toThrow('Invalid data');
    });

    test('updateGame should update a game', async () => {
        const game = await GameService.findOneGame(1);
        const updatedGame = await GameService.updateGame({ title: "Updated Game" }, game);
        expect(updatedGame.title).toBe("Updated Game");
    });

    test('updateGame should throw an error if update fails', async () => {
        const game = await GameService.findOneGame(1);
        game.update.mockImplementationOnce(() => {
            throw new Error('Update failed');
        });
        await expect(GameService.updateGame({ title: "Failed Update" }, game)).rejects.toThrow('Update failed');
    });

    test('deleteGame should delete a game', async () => {
        const game = await GameService.deleteGame(1);
        expect(game).not.toBeNull();
        expect(game.id).toBe(1);
    });

    test('deleteGame should return null if game is not found', async () => {
        const gameMock = require('../../src/Business/Models/Game.Model.js');
        gameMock.findByPk.mockImplementationOnce(() => null);
        const game = await GameService.deleteGame(999);
        expect(game).toBeNull();
    });
});