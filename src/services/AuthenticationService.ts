export class AuthenticationService {
  private static instance: AuthenticationService;

  public static getInstance(): AuthenticationService {
    if (!this.instance) {
      this.instance = new AuthenticationService();
    }

    return this.instance;
  }
}
