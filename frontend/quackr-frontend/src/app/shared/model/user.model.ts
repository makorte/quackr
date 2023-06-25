export class User {
  constructor(public username: string, public imageUrl: string, public role: string) {
  }

  isAdmin(): boolean {
    return this.role === "ROLE_ADMIN"
  }
}
