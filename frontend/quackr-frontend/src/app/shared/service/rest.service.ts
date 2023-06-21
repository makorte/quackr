import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from "../model/post.model";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
/**
 * Service für die Kommunikation mit dem Backend.
 */
export class RestService implements OnInit, OnDestroy {


  private users = [
    new User("TestNutzer", "/assets/Gucci_Spider_2.jpg"),
    new User("TestNutzer2", "/assets/katze.jpg")
  ];

  private posts = [
    new PostModel("Post 1 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 1, "/assets/katze.jpg"),
    new PostModel("Post 2 \n Das ist ein sehr wichtiger Post", this.users[1], "10.06.2023 23:06", 2),
    new PostModel("Post 3 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 3),
    new PostModel("Post 12 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 4),
    new PostModel("Post 22 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 5),
    new PostModel("Post 32 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 6),
    new PostModel("Post 13 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 7),
    new PostModel("Post 23 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 8),
    new PostModel("Post 33 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 9),
    new PostModel("Post 14 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 10),
    new PostModel("Post 24 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 11),
    new PostModel("Post 34 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 12),
    new PostModel("Post 44 \n Das ist ein sehr wichtiger Post", this.users[0], "10.06.2023 23:06", 13)];

  constructor() {
  }

  public loadUser(username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      for (let user of this.users) {
        if (user.username == username) resolve(user);
      }
      reject("User Not Found");
    });
  }

  /**
   * Fragt die Posts vom Server an und gibt diese zurück. Vielleicht gibt er später ein Subject zurück.
   */
  public loadPosts(): Promise<PostModel[]> {
    return new Promise((resolve) => resolve(this.posts));
  }


  public loadPost(id: number): Promise<PostModel> {
    return new Promise((resolve, reject) => {
      for (let post of this.posts) {
        if (post.id == id) {
          resolve(post)
        }
      }
      reject("Post nicht gefunden");
    });
  }


  public createPost(post: PostModel): Promise<PostModel> {
    return new Promise<PostModel>((resolve, reject) => {
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

  public loadPostsFromUser(user: User): Promise<PostModel[]> {
    return new Promise((resolve) => resolve(this.posts.filter(post => post.createdBy == user)));
  }


  ngOnDestroy(): void {
    console.log("on Destroy rest")
  }

  ngOnInit(): void {
    console.log("on Init rest")
  }
}
