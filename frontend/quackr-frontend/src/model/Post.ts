import {User} from "./User";

export class Post {
  constructor(public message: string, public ersteller: User, public createdAt: string = "10.06.2023 23:06", public id: number | null = null, public imageLink: string | null = null) {

  }
}

