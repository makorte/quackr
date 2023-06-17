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




  private users = [
    new User(0,[],"TestNutzer", "/assets/Gucci_Spider_2.jpg", ""),
    new User(1,[],"TestNutzer2", "/assets/katze.jpg", "")
  ];

  private posts = [
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.NONE,this.users[0], 1, null,  "/katze.jpg"),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[1], 2),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.NONE,this.users[0], 3),
    new Post("Post 12 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.NONE,this.users[0], 4),
    new Post("Post 22 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 5),
    new Post("Post 32 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.NONE,this.users[0], 6),
    new Post("Post 13 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.LIKED,this.users[0], 7),
    new Post("Post 23 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 8),
    new Post("Post 33 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.DISLIKED,this.users[0], 9),
    new Post("Post 14 \n Das ist ein sehr wichtiger Post", 1, 2, LikeStatus.NONE,this.users[0], 10),
    new Post("Post 24 \n Das ist ein sehr wichtiger Post", 0, 0, LikeStatus.NONE,this.users[0], 11),
    new Post("Post 34 \n Das ist ein sehr wichtiger Post", 0, 9, LikeStatus.NONE,this.users[0], 12),
    new Post("Post 44 \n Das ist ein sehr wichtiger Post", 6468, 647968, LikeStatus.NONE,this.users[0], 13)];

  constructor() {
    this.posts[3].kommentarVon = this.posts[2];
    this.posts[4].kommentarVon = this.posts[2];
    this.posts[7].kommentarVon = this.posts[3];
  }
  public loadUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.users.length <= id) {
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
    return new Promise((resolve) => resolve(this.posts.filter(value => value.kommentarVon == null)));
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

  public loadKommentare(id: number): Promise<Post[]> {
    return new Promise((resolve) => {
      let kommentare: Post[] = [];
      this.posts.forEach(value => {
        if (value.kommentarVon != null && value.kommentarVon.id == id) kommentare.push(value);
      })
      resolve(kommentare);
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
