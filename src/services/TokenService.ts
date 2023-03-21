import { StorageService } from './StorageService';
import { AuthToken } from '../models/AuthToken';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_AT_KEY = 'expiresAt';

export class TokenService {
  private storageService: StorageService;
  private token?: string;
  private refreshToken?: string;
  private expiresAt?: Date;
  constructor() {
    this.storageService = new StorageService();

    this.token = this.storageService.get(TOKEN_KEY);
    this.refreshToken = this.storageService.get(REFRESH_TOKEN_KEY);
    const expiresAt = this.storageService.get<string>(EXPIRES_AT_KEY);
    this.expiresAt = expiresAt ? new Date(+expiresAt) : undefined;
  }

  getToken() {
    return this.token ?? '';
  }

  getRefreshToken() {
    return this.refreshToken ?? '';
  }

  getExpiresDateTime(): number {
    return this.expiresAt ? this.expiresAt.getTime() : 0;
  }

  setTokenData(tokenData: AuthToken) {
    this.storageService.set(TOKEN_KEY, tokenData.token);
    this.token = tokenData.token;

    this.storageService.set(REFRESH_TOKEN_KEY, tokenData.refreshToken);
    this.refreshToken = tokenData.refreshToken;

    this.expiresAt = tokenData.expiresAt;
    this.storageService.set(EXPIRES_AT_KEY, this.expiresAt.getTime());
  }

  isTokenValid(): boolean {
    return !!this.token && this.getExpiresDateTime() > Date.now();
  }

  logOut() {
    this.token = undefined;
    this.refreshToken = undefined;
    this.expiresAt = undefined;
    this.storageService.remove(TOKEN_KEY);
    this.storageService.remove(REFRESH_TOKEN_KEY);
    this.storageService.remove(EXPIRES_AT_KEY);
  }
}

export const tokenService = new TokenService();
