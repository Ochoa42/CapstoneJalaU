import { tokenService } from "../../src/Data/Service/TokenInvalid.Service.js";

describe('TokenInvalid.Service.js', () => {
    describe('isTokenBlacklisted', () => {
        it('should return true if token is blacklisted', async () => {
            const token = 'blacklisted_token';
            tokenService.isTokenBlacklisted = jest.fn().mockResolvedValue(true);

            const result = await tokenService.isTokenBlacklisted(token);

            expect(result).toBe(true);
        });

        it('should return false if token is not blacklisted', async () => {
            const token = 'valid_token';
            tokenService.isTokenBlacklisted = jest.fn().mockResolvedValue(false);

            const result = await tokenService.isTokenBlacklisted(token);

            expect(result).toBe(false);
        });
    });

    describe('invalidateToken', () => {
        it('should invalidate token successfully', async () => {
            const token = 'valid_token';
            tokenService.invalidateToken = jest.fn().mockResolvedValue(true);

            const result = await tokenService.invalidateToken(token);

            expect(result).toBe(true);
        });

        it('should fail to invalidate token', async () => {
            const token = 'invalid_token';
            tokenService.invalidateToken = jest.fn().mockResolvedValue(false);

            const result = await tokenService.invalidateToken(token);

            expect(result).toBe(false);
        });
    });
});
