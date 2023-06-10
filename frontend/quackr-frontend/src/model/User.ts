import {Post} from "./Post";

export class User {
  public posts: Post[];
  public userIconLink: string;
  public name: string;
  public biografie: string;
  public id: number;

  constructor(id: number,posts: Post[], name: string, userIconLink: string, biografie: string) {
    this.id = id;
    this.posts = posts;
    this.name = name;
    this.userIconLink = userIconLink;
    this.biografie = biografie;
  }

}
