import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./model/Post";
import {OK, Result} from "./model/Result";
import {User} from "./model/User";

@Injectable({
  providedIn: 'root'
})
/**
 * Service für die Kommunikation mit dem Backend.
 */
export class RestService  implements OnInit, OnDestroy{




  private users = [
    new User(0,"TestNutzer", "/assets/Gucci_Spider_2.jpg"),
    new User(1,"TestNutzer2", "/assets/katze.jpg")
  ];

  private posts = [
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 1,  "/assets/katze.jpg"),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", this.users[1],"10.06.2023 23:06", 2),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", this.users[0],"10.06.2023 23:06", 3),
    new Post("Post 12 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 4),
    new Post("Post 22 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 5),
    new Post("Post 32 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 6),
    new Post("Post 13 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 7),
    new Post("Post 23 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 8),
    new Post("Post 33 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 9),
    new Post("Post 14 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 10),
    new Post("Post 24 \n Das ist ein sehr wichtiger Post",this.users[0], "10.06.2023 23:06",11),
    new Post("Post 34 \n Das ist ein sehr wichtiger Post",this.users[0],"10.06.2023 23:06", 12),
    new Post("Post 44 \n Das ist ein sehr wichtiger Post",this.users[0], "10.06.2023 23:06",13)];

  constructor() {
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

  public loadPostsFromUser(user: User): Promise<Post[]> {
    return new Promise((resolve) => resolve(this.posts.filter(post => post.ersteller == user)));
  }


  ngOnDestroy(): void {
    console.log("on Destroy rest")
  }

  ngOnInit(): void {
    console.log("on Init rest")
  }
}
