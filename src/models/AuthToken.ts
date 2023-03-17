export class AuthToken {
  public token: string;
  public refreshToken: string;
  public expiresAt: Date;

  constructor(token: string, refreshToken: string, expiresIn: number) {
    this.token = token;
    this.refreshToken = refreshToken;

    const now = new Date();
    this.expiresAt = new Date(now.getTime() + expiresIn * 1000);
  }
}
