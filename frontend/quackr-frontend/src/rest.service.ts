import {Injectable} from '@angular/core';
import {LikeStatus, Post} from "./model/Post";
import {OK, Result} from "./model/Result";
import {User} from "./model/User";

@Injectable({
  providedIn: 'root'
})
/**
 * Service für die Kommunikation mit dem Backend.
 */
export class RestService {

  constructor() {
  }


  private users = [
    new User(0,[],"TestNutzer", "/assets/Katze.jpg", ""),
    new User(1,[],"TestNutzer2", "/assets/Katze.jpg", "")
  ];

  private posts = [
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.NONE,this.users[0], 1, "/katze.jpg"),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 2),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.NONE,this.users[0], 3),
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.NONE,this.users[0], 4),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 5),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.NONE,this.users[0], 6),
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.LIKED,this.users[0], 7),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 8),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.DISLIKED,this.users[0], 9),
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.NONE,this.users[0], 10),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 11),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.NONE,this.users[0], 12),
    new Post("Post 4 \n Das ist ein sehr wichtiger Post", 6468, 647968, LikeStatus.NONE,this.users[0], 13)];

  public loadUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.users.length >= id) {
        reject("User not Found");
      }else {
        resolve(this.users[id])
      }
    });
  }
  /**
   * Fragt die Posts vom Server an und gibt diese zurück. Vielleicht gibt er später ein Subject zurück.
   */
  public loadPosts(): Promise<Post[]> {
    return new Promise((resolve) => resolve(this.posts));
  }



  public loadPost(id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
      for (let post of this.posts) {
        if (post.id == id) {
          resolve(post)
        }
      }
      reject("Post nicht gefunden");
    });
  }

  public createPost(post: Post): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      if (post.message === "") {
        reject()
      } else {
        let max = 0;
        for (let lPost of this.posts) {
          if (lPost.id != null && lPost.id > max) {
            max = lPost.id;
          }
        }
        post.id = max + 1;
        this.posts.unshift(post);
        resolve(post)
      }
    });
  }


  public postLikeChange(post: Post): Result<any> {
    console.log("Liked?" + post.likeStatus + " : " + post.likes + ", " + post.dislikes);
    return new OK(null);
  }

}
