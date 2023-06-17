import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../rest.service";
import {User} from "../model/User";
import {LoadingState} from "../model/LoadingState";
import {Post} from "../model/Post";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent {
  public user: User|null = null;
  state: LoadingState = LoadingState.Loading;
  restService: RestService;
  route: ActivatedRoute;
  router: Router;

  constructor(router: Router, route : ActivatedRoute, restService: RestService) {
    this.restService = restService;
    this.route = route;
    this.router = router;

    this.route.params.subscribe({
      next: params => {
        const id = Number(params["id"]);
        if (isNaN(id)) {
          this.router.navigate(["app", "posts"]);
        }else {
          restService.loadUser(id)
            .then(user =>{
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
      let lUser: User = new User(-1,[],"","","");
      this.route.params.subscribe({
        next: params => {
          const id = Number(params["id"]);
          if (isNaN(id)) {
            reject("No User ID")
          }else {
            this.restService.loadUser(id)
              .then(user =>{
                lUser = user;
              })
              .catch(err => {
                lUser = new User(-1,[],"","","");
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
}
