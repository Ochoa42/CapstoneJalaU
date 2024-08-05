import { generateJWT } from '../../src/Business/plugins/generate-jwt.plugin.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('generateJWT', () => {
    it('should generate a JWT token successfully', async () => {
        const id = '1';
        const name = 'Test Player';
        const email = 'test@example.com';
        const token = 'generated_token';

        jwt.sign.mockImplementation((payload, secret, options, callback) => callback(null, token));

        const result = await generateJWT(id, name, email);

        expect(result).toBe(token);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id, name, email },
            expect.any(String),
            expect.any(Object),
            expect.any(Function)
        );
    });

    it('should handle errors in token generation', async () => {
        const id = '1';
        const name = 'Test Player';
        const email = 'test@example.com';
        const error = new Error('Token generation failed');

        jwt.sign.mockImplementation((payload, secret, options, callback) => callback(error, null));

        await expect(generateJWT(id, name, email)).rejects.toThrow('Token generation failed');
    });
});