import {User} from "./user";

export class PostModel {
  constructor(public message: string, public createdBy: User, public createdAt: string = "10.06.2023 23:06", public id: number | null = null, public imageLink: string | null = null) {

  }
}

