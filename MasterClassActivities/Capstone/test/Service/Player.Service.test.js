import { PlayerService } from "../../src/Data/Service/Player.Service.js";
import SequelizeMock from 'sequelize-mock';

jest.mock('../../src/Business/Models/Player.Model.js', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const playerMock = DBConnectionMock.define('players', {
        id: 1,
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
        username: "johndoe",
        password: "hashedpassword"
    });

    playerMock.findByPk = jest.fn().mockImplementation((id) => {
        if (id === 1) {
            return playerMock.build({
                id: 1,
                name: "John Doe",
                age: 30,
                email: "john.doe@example.com",
                username: "johndoe",
                password: "hashedpassword"
            });
        }
        return null;
    });

    playerMock.findOne = jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
            return playerMock.build({
                id: 1,
                name: "John Doe",
                age: 30,
                email: "john.doe@example.com",
                username: "johndoe",
                password: "hashedpassword"
            });
        }
        return null;
    });

    playerMock.findAll = jest.fn().mockImplementation(() => {
        return [playerMock.build({
            id: 1,
            name: "John Doe",
            age: 30,
            email: "john.doe@example.com",
            username: "johndoe",
            password: "hashedpassword"
        })];
    });

    playerMock.create = jest.fn().mockImplementation((data) => {
        return playerMock.build({
            id: 2,
            ...data
        });
    });

    return playerMock;
});

describe('PlayerService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findOnePlayer should return one player', async () => {
        const player = await PlayerService.findOnePlayer(1);
        expect(player).not.toBeNull();
        expect(player.id).toBe(1);
    });

    test('findOnePlayer should return null if player is not found', async () => {
        const player = await PlayerService.findOnePlayer(999);
        expect(player).toBeNull();
    });

    test('findAllPlayers should return all players', async () => {
        const players = await PlayerService.findAllPlayers();
        expect(players).not.toBeNull();
        expect(players.length).toBeGreaterThan(0);
    });

    test('findAllPlayers should return an empty array if no players are found', async () => {
        const playerMock = require('../../src/Business/Models/Player.Model.js');
        playerMock.findAll.mockImplementationOnce(() => []);
        const players = await PlayerService.findAllPlayers();
        expect(players).toEqual([]);
    });

    test('createPlayer should create a player', async () => {
        const newPlayer = { name: "Jane Doe", age: 25, email: "jane.doe@example.com", username: "janedoe", password: "newpassword" };
        const player = await PlayerService.createPlayer(newPlayer);
        expect(player).not.toBeNull();
        expect(player.name).toBe("Jane Doe");
    });

    test('createPlayer should throw an error if data is invalid', async () => {
        const playerMock = require('../../src/Business/Models/Player.Model.js');
        playerMock.create.mockImplementationOnce(() => {
            throw new Error('Invalid data');
        });
        await expect(PlayerService.createPlayer({})).rejects.toThrow('Invalid data');
    });

    test('updatePlayer should update a player', async () => {
        const player = await PlayerService.findOnePlayer(1);
        const updatedPlayer = await PlayerService.updatePlayer({ name: "Updated Name" }, player);
        expect(updatedPlayer.name).toBe("Updated Name");
    });

    test('updatePlayer should throw an error if update fails', async () => {
        const player = await PlayerService.findOnePlayer(1);
        player.update.mockImplementationOnce(() => {
            throw new Error('Update failed');
        });
        await expect(PlayerService.updatePlayer({ name: "Failed Update" }, player)).rejects.toThrow('Update failed');
    });

    test('deletePlayer should delete a player', async () => {
        const player = await PlayerService.deletePlayer(1);
        expect(player).not.toBeNull();
        expect(player.id).toBe(1);
    });

    test('deletePlayer should return null if player is not found', async () => {
        const playerMock = require('../../src/Business/Models/Player.Model.js');
        playerMock.findByPk.mockImplementationOnce(() => null);
        const player = await PlayerService.deletePlayer(999);
        expect(player).toBeNull();
    });
});