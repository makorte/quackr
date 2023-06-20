import {UserModel} from "./user.model";

export class PostModel {
  constructor(public message: string, public createdBy: UserModel, public createdAt: string = "10.06.2023 23:06", public id: number | null = null, public imageLink: string | null = null) {

  }
}

