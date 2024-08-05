import { ScoreService } from "../../src/Data/Service/Score.Service.js";
import SequelizeMock from 'sequelize-mock';

jest.mock('../../src/Business/Models/Score.Model.js', () => {
    const SequelizeMock = require('sequelize-mock');
    const DBConnectionMock = new SequelizeMock();
    const scoreMock = DBConnectionMock.define('scores', {
        id: 1,
        playerId: 1,
        gameId: 1,
        score: 100
    });

    scoreMock.findByPk = jest.fn().mockImplementation((id) => {
        if (id === 1) {
            return scoreMock.build({
                id: 1,
                playerId: 1,
                gameId: 1,
                score: 100
            });
        }
        return null;
    });

    scoreMock.findOne = jest.fn().mockImplementation(({ where }) => {
        if (where.id === 1) {
            return scoreMock.build({
                id: 1,
                playerId: 1,
                gameId: 1,
                score: 100
            });
        }
        return null;
    });

    scoreMock.findAll = jest.fn().mockImplementation(() => {
        return [scoreMock.build({
            id: 1,
            playerId: 1,
            gameId: 1,
            score: 100
        })];
    });

    scoreMock.create = jest.fn().mockImplementation((data) => {
        return scoreMock.build({
            id: 2,
            ...data
        });
    });

    return scoreMock;
});

describe('ScoreService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findOneScore should return one score', async () => {
        const score = await ScoreService.findOneScore(1);
        expect(score).not.toBeNull();
        expect(score.id).toBe(1);
    });

    test('findOneScore should return null if score is not found', async () => {
        const score = await ScoreService.findOneScore(999);
        expect(score).toBeNull();
    });

    test('findAllScores should return all scores', async () => {
        const scores = await ScoreService.findAllScores();
        expect(scores).not.toBeNull();
        expect(scores.length).toBeGreaterThan(0);
    });

    test('findAllScores should return an empty array if no scores are found', async () => {
        const scoreMock = require('../../src/Business/Models/Score.Model.js');
        scoreMock.findAll.mockImplementationOnce(() => []);
        const scores = await ScoreService.findAllScores();
        expect(scores).toEqual([]);
    });

    test('createScore should create a score', async () => {
        const newScore = { playerId: 2, gameId: 3, score: 200 };
        const score = await ScoreService.CreateScore(newScore);
        expect(score).not.toBeNull();
        expect(score.playerId).toBe(2);
        expect(score.gameId).toBe(3);
        expect(score.score).toBe(200);
    });

    test('createScore should throw an error if data is invalid', async () => {
        const scoreMock = require('../../src/Business/Models/Score.Model.js');
        scoreMock.create.mockImplementationOnce(() => {
            throw new Error('Invalid data');
        });
        await expect(ScoreService.CreateScore({})).rejects.toThrow('Invalid data');
    });

    test('updateScore should update a score', async () => {
        const score = await ScoreService.findOneScore(1);
        const updatedScore = await ScoreService.updateScore({ score: 150 }, score);
        expect(updatedScore.score).toBe(150);
    });

    test('updateScore should throw an error if update fails', async () => {
        const score = await ScoreService.findOneScore(1);
        score.update.mockImplementationOnce(() => {
            throw new Error('Update failed');
        });
        await expect(ScoreService.updateScore({ score: 300 }, score)).rejects.toThrow('Update failed');
    });

    test('deleteScore should delete a score', async () => {
        const score = await ScoreService.deleteScore(1);
        expect(score).not.toBeNull();
        expect(score.id).toBe(1);
    });

    test('deleteScore should return null if score is not found', async () => {
        const scoreMock = require('../../src/Business/Models/Score.Model.js');
        scoreMock.findByPk.mockImplementationOnce(() => null);
        const score = await ScoreService.deleteScore(999);
        expect(score).toBeNull();
    });
});