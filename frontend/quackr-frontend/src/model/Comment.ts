import {LikeStatus, Post} from "./Post";
import {User} from "./User";

export class Comment {
  public post: Post;
  public ersteller: User;
  public message: string;
  public likes: number;
  public dislikes: number;
  public likeStatus: LikeStatus;
  public erstellungsDatum: string = "10.06.2023 23:52";


  constructor(post: Post, ersteller: User, message: string, likes: number, dislikes: number, likeStatus: LikeStatus, erstellungsDatum: string = "10.06.2023 23:52") {
    this.post = post;
    this.ersteller = ersteller;
    this.message = message;
    this.likes = likes;
    this.dislikes = dislikes;
    this.likeStatus = likeStatus;
    this.erstellungsDatum = erstellungsDatum;

    this.post.comments.unshift(this);

  }
}
