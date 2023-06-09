import {Injectable} from '@angular/core';
import {Post} from "./model/Post";
import {OK, Result} from "./model/Result";

@Injectable({
  providedIn: 'root'
})
/**
 * Service für die Kommunikation mit dem Backend.
 */
export class RestService {

  constructor() {
  }

  private posts = [
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9),
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9),
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9),
    new Post("Post 1 \n Das ist ein sehr wichtiger Post", 1, 2),
    new Post("Post 2 \n Das ist ein sehr wichtiger Post", 0, 0),
    new Post("Post 3 \n Das ist ein sehr wichtiger Post", 0, 9),
    new Post("Post 4 \n Das ist ein sehr wichtiger Post", 6468, 647968)];

  /**
   * Fragt die Posts vom Server an und gibt diese zurück. Vielleicht gibt er später ein Subject zurück.
   */
  public loadPosts(): Promise<Post[]> {
    return new Promise((resolve) => resolve(this.posts));
  }

  public createPost(post: Post): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      if (post.message === "") {
        reject()
      } else {
        this.posts.unshift(post);
        resolve(post)
      }
    });
  }


  public postLikeChange(post: Post, liked: boolean): Result<any> {
    post.likes += liked ? 1 : -1;
    console.log("Liked?"+liked+" : " + post.likes);
    return new OK(null);
  }

  public postDislikeChange(post: Post, disliked: boolean): Result<any> {
    post.dislikes += disliked ? 1 : -1;
    console.log("Disliked?"+disliked+" : " + post.dislikes);
    return new OK(null);
  }
}
