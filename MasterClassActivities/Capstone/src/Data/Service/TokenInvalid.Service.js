class TokenService {
    constructor() {
        this.blacklistedTokens = new Set();
    }

    invalidateToken(token) {
        this.blacklistedTokens.add(token);
        return true;
    }

    isTokenBlacklisted(token) {
        return this.blacklistedTokens.has(token);
    }
}

export const tokenService = new TokenService();