import {User} from "./user.model";

export class AuthenticationResponse {
  constructor(public jwt: string, public user: User) {
  }
}
