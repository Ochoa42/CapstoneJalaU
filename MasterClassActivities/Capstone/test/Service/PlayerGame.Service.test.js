import { playerGameService } from '../../src/Data/Service/PlayerGame.Service.js';

jest.mock('../../src/Business/Models/PlayerGame.Model.js', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const PlayerGameMock = DBConnectionMock.define('PlayerGame', {
        id: 1,
        playerId: '1',
        gameId: '2',
    });

    PlayerGameMock.findOne = jest.fn(({ where }) => {
        if (where.playerId === '1' && where.gameId === '2') {
            return PlayerGameMock.build({ id: 1, playerId: '1', gameId: '2' });
        }
        return null;
    });

    PlayerGameMock.findAll = jest.fn(({ where }) => {
        if (where && where.gameId === '2') {
            return [{ id: '1', playerId: '1', gameId: '2' }];
        }
        return [{ id: '1', playerId: '1', gameId: '2' }, { id: '2', playerId: '3', gameId: '4' }];
    });

    PlayerGameMock.create = jest.fn(data => PlayerGameMock.build({ id: 1, ...data }));

    PlayerGameMock.destroy = jest.fn(() => 1);

    PlayerGameMock.findAll = jest.fn(({ include }) => {
        if (include && include[0].model.name === 'Player') {
            return [{ id: '1', playerId: '1', gameId: '2', Player: { id: '1', username: 'player1', email: 'player1@example.com' } }];
        }
        return [];
    });

    return PlayerGameMock;
});

jest.mock('../../src/Business/Models/Player.Model.js', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const PlayerMock = DBConnectionMock.define('Player', {
        id: '1',
        username: 'player1',
        email: 'player1@example.com',
    });

    return PlayerMock;
});

describe('playerGameService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createPlayerGame should create a player game', async () => {
        const data = { playerId: '1', gameId: '2' };
        const result = await playerGameService.createPlayerGame(data);

        expect(result).not.toBeNull();
        expect(result.playerId).toBe('1');
        expect(result.gameId).toBe('2');
    });

    test('findOnePlayerGame should return one player game', async () => {
        const result = await playerGameService.findOnePlayerGame('1', '2');

        expect(result).not.toBeNull();
        expect(result.playerId).toBe('1');
        expect(result.gameId).toBe('2');
    });

    test('findAllPlayerGame should return all player games', async () => {
        const result = await playerGameService.findAllPlayerGame();

        expect(result).not.toBeNull();
        expect(result.length).toBeGreaterThan(0);
    });

    test('DeleteGamePlayer should delete a player game', async () => {
        const result = await playerGameService.DeleteGamePlayer('1', '2');

        expect(result).toBe(1);
    });

    test('findPlayersByGameId should return players by game ID', async () => {
        const result = await playerGameService.findPlayersByGameId('2');

        expect(result).not.toBeNull();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].Player.username).toBe('player1');
    });
});
