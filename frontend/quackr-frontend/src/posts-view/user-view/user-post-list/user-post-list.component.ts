import {Component} from '@angular/core';
import {RestService} from "../../rest.service";
import {Post} from "../../model/Post";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";
import {Err, ErrorCodes, OK} from "../../model/Result";

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.sass']
})
export class UserPostListComponent {
  private restService: RestService;

  public posts: Post[] = [];

  route: ActivatedRoute;
  router: Router;

  constructor(router: Router, route: ActivatedRoute, restService: RestService) {
    this.restService = restService;
    this.route = route;
    this.router = router;
    this.loadPosts();
  }

  getUserID(funk: (userId: number) => void) {
    let id = NaN;
    this.route.params.subscribe({
      next: params => {
        id = Number(params["id"]);
        funk(id);
      }
    });
  }

  loadUser(id: number):Promise<User> {
    return this.restService.loadUser(id);
  }

  loadPosts() {
     this.getUserID(
       (userID) =>
       this.loadUser(userID).then(user => this.posts = user.posts)
      );
  }

// loadPosts() {
//   let lUser: User = new User(-1, [], "", "", "");
//
//   let result =
//     this.route.params.subscribe({
//       next: params => {
//         const id = Number(params["id"]);
//         if (isNaN(id)) {
//           reject("No User ID")
//         } else {
//           this.restService.loadUser(id)
//             .then(user => {
//               lUser = user;
//               resolve(user.posts)
//             })
//             .catch(err => {
//               lUser = new User(-1, [], "", "", "");
//               reject("Rest Service");
//             })
//           ;
//         }
//       }
//     });
//   };
//   result.then(value => this.posts = value);
// }




  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }

  postLikeChange(post: Post) {
    this.restService.postLikeChange(post);
  }

  protected readonly onabort = onabort;
}
