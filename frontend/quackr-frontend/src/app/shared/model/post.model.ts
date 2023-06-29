import {User} from "./user.model";

export class Post {
  constructor(public id: number, public message: string, public user: User, public date: string, public imageUrl: string) {
  }
}

