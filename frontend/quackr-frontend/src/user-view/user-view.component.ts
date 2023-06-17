import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../rest.service";
import {User} from "../model/User";
import {LoadingState} from "../model/LoadingState";
import {Post} from "../model/Post";
import {openCreatePostForm} from "../openCreatePostForm";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent {
  public user: User | null = null;
  state: LoadingState = LoadingState.Loading;
  restService: RestService;
  route: ActivatedRoute;
  router: Router;
  private authService: AuthService;
  post: Post|null = null;

  constructor(router: Router, route: ActivatedRoute, restService: RestService, authService: AuthService) {
    this.restService = restService;
    this.route = route;
    this.router = router;
    this.authService = authService;

    this.route.params.subscribe({
      next: params => {
        const id = Number(params["id"]);
        if (isNaN(id)) {
          this.router.navigate(["app", "posts"]);
        } else {
          let loadUser: Promise<User> = restService.loadUser(id);
          loadUser
            .then(user => {
              this.user = user;
              this.state = LoadingState.Loaded;
            })
            .catch(err => {
              this.state = LoadingState.Error;
            })
          ;
        }
      }
    });
  }

  getPostFunction(): () => Promise<Post[]> {
    return () => new Promise((resolve, reject) => {
      let lUser: User = new User(-1, [], "", "", "");
      this.route.params.subscribe({
        next: params => {
          const id = Number(params["id"]);
          if (isNaN(id)) {
            reject("No User ID")
          } else {
            let loadUser: Promise<User> = this.restService.loadUser(id);
            loadUser
              .then(user => {
                lUser = user;
              })
              .catch(err => {
                lUser = new User(-1, [], "", "", "");
                reject("Rest Service");
              })
            ;
          }
        }
      });
      while (lUser.id == -1) {
      }

      console.log("resolved User posts")
      resolve(lUser.posts)
    })
  }

  protected readonly LoadingState = LoadingState;
  protected readonly openCreatePostForm = openCreatePostForm;
  reloadFunction: () => void = () => console.log("Default User View");
  setReload(reloadFunction: () => void) {
    this.reloadFunction = () => {
      this.post = null;
      reloadFunction();
    }
  }
  isAuth() {
    return this.authService.isAuthenticated();
  }

  openKommentarDialog(post: Post) {
    this.post = post;
    openCreatePostForm();
  }

  openCreatePostDialog() {
    this.post = null;
    openCreatePostForm();
  }
}
