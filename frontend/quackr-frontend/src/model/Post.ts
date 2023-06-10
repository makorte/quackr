import {User} from "./User";

export class Post {
  public message: string;
  public likes: number;
  public dislikes: number;
  public imageLink: string | null = null;
  public likeStatus: LikeStatus;
  public id: number|null;
  public ersteller: User;
  public erstellungsDatum: string = "10.06.2023 23:52";


  constructor(message: string, likes: number, dislikes: number, likeStatus: LikeStatus,ersteller: User, id: number|null = null, imageLink: string | null = null) {
    this.message = message;
    this.likes = likes;
    this.dislikes = dislikes;
    this.likeStatus = likeStatus;
    this.imageLink = imageLink;
    this.id = id;
    this.ersteller = ersteller;
    ersteller.posts.unshift(this);
  }

  public hasLiked(): boolean {
    return this.likeStatus == LikeStatus.LIKED;
  }

  public hasDisliked(): boolean {
    return this.likeStatus == LikeStatus.DISLIKED;
  }

  public setLikeState(newState: LikeStatus) {
    if (this.likeStatus == newState) {
      return;
    }
    switch (newState) {
      case LikeStatus.NONE:
        switch (this.likeStatus) {
          case LikeStatus.LIKED:
            this.likes--;
            break;
          case LikeStatus.DISLIKED:
            this.dislikes--;
            break;
        }
        break;
      case LikeStatus.LIKED:
        switch (this.likeStatus) {
          case LikeStatus.DISLIKED:
            this.dislikes--;
            this.likes++;
            break;
          case LikeStatus.NONE:
            this.likes++;
            break;
        }
        break;
      case LikeStatus.DISLIKED:
        switch (this.likeStatus) {
          case LikeStatus.LIKED:
            this.likes--;
            this.dislikes++;
            break;
          case LikeStatus.NONE:
            this.dislikes++;
            break;
        }
        break;
    }
    this.likeStatus = newState;
  }

  public likeChange() {
    console.log("like change post")
    if (this.likeStatus == LikeStatus.LIKED) {
      this.setLikeState(LikeStatus.NONE);
    } else {
      this.setLikeState(LikeStatus.LIKED);
    }
  }

  public dislikeChange() {
    if (this.likeStatus == LikeStatus.DISLIKED) {
      this.setLikeState(LikeStatus.NONE);
    } else {
      this.setLikeState(LikeStatus.DISLIKED);
    }
  }
}

export enum LikeStatus {
  NONE,
  LIKED,
  DISLIKED
}
