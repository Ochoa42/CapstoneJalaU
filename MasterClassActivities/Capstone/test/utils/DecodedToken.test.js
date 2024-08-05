import jwt from 'jsonwebtoken';
import { envs } from '../../src/config/enviroments/enviroments.js';
import { PlayerService } from '../../src/Data/Service/Player.Service.js';
import { decodedToken } from '../../src/config/Utils/DecodedToken.js';

jest.mock('jsonwebtoken');
jest.mock('../../src/Data/Service/Player.Service.js');

describe('decodedToken', () => {
    const mockPlayer = { id: '1', name: 'Test Player', email: 'test@example.com' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should decode a valid token and return player', async () => {
        const token = 'valid_token';
        jwt.verify.mockResolvedValue({ id: '1' });
        PlayerService.findOnePlayer.mockResolvedValue(mockPlayer);

        const result = await decodedToken(token);

        expect(jwt.verify).toHaveBeenCalledWith(token, envs.SECRET_JWT_SEED);
        expect(PlayerService.findOnePlayer).toHaveBeenCalledWith('1');
        expect(result).toEqual(mockPlayer);
    });

    it('should throw an error if token is invalid', async () => {
        const token = 'invalid_token';
        jwt.verify.mockRejectedValue(new Error('Invalid token'));

        await expect(decodedToken(token)).rejects.toThrow('Invalid token');
    });

    it('should throw an error if player is not found', async () => {
        const token = 'valid_token';
        jwt.verify.mockResolvedValue({ id: '1' });
        PlayerService.findOnePlayer.mockResolvedValue(null);

        await expect(decodedToken(token)).rejects.toThrow('Invalid token');
    });
});