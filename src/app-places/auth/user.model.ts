export class User {
  constructor(
    private _userId: string,
    private email: string,
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

  get token(): string {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }

  get userId(): string {
    return this._userId;
  }

  get tokenDuration(): number {
    if (!this.token) {
      return 0;
    }
    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }
}
