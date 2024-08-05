import { tokenService } from '../../src/Data/Service/TokenInvalid.Service.js';

describe('TokenService', () => {
    beforeEach(() => {
        // Clear the blacklisted tokens before each test
        tokenService.blacklistedTokens.clear();
    });

    it('should add a token to the blacklist', () => {
        const token = 'sampleToken123';
        expect(tokenService.invalidateToken(token)).toBe(true);
        expect(tokenService.isTokenBlacklisted(token)).toBe(true);
    });

    it('should check if a token is blacklisted', () => {
        const token = 'sampleToken123';
        tokenService.invalidateToken(token);
        expect(tokenService.isTokenBlacklisted(token)).toBe(true);
        expect(tokenService.isTokenBlacklisted('anotherToken')).toBe(false);
    });

    it('should throw an error for invalid token format', () => {
        expect(() => tokenService.invalidateToken(123)).toThrow('Invalid token format');
        expect(() => tokenService.isTokenBlacklisted(123)).toThrow('Invalid token format');
    });
});