
export class Post {
  public message: string;
  public likes: number;
  public dislikes: number;


  constructor(message: string, likes: number, dislikes: number) {
    this.message = message;
    this.likes = likes;
    this.dislikes = dislikes;
  }

}
