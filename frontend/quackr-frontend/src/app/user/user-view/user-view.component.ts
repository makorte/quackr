import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../shared/service/rest.service";
import {User} from "../../shared/model/user";
import {LoadingState} from "../../shared/model/LoadingState";
import {PostModel} from "../../shared/model/post.model";
import {openCreatePostForm} from "../../shared/openCreatePostForm";
import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent {
 private user: User | null = null;
 private state: LoadingState = LoadingState.Loading;
 private post: PostModel | null = null;

  constructor(private router: Router,private route: ActivatedRoute, private restService: RestService,private authService: AuthService) {
    this.route.params.subscribe({
      next: params => {
        const id: string = params["id"];
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
    });
  }

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


  openCreatePostDialog() {
    this.post = null;
    openCreatePostForm();
  }

  isLoading(): boolean {
    return this.state == LoadingState.Loading;
  }

  isLoaded(): boolean {
    return this.user != null && this.state == LoadingState.Loaded;
  }

  getUser():User {
    return <User>this.user;
  }
}
