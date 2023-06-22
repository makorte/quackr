import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/model/user.model";
import {LoadingState} from "../../shared/model/LoadingState";
import {Post} from "../../shared/model/post.model";
import {openCreatePostForm} from "../../shared/openCreatePostForm";
import {AuthService} from "../../shared/service/auth.service";
import {UserService} from "../../shared/service/user.service";
import {PostService} from "../../shared/service/post.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit{
  private user: User | null = null;
  private state: LoadingState = LoadingState.Loading;
  private post: Post | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private postService: PostService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get("username");
      this.userService.getUserByUsername(username)
        .then(user => {
          this.user = user;
          this.state = LoadingState.Loaded;
        })
        .catch((error: HttpErrorResponse) => {
          if(error.status === 403) {
            this.router.navigate([""]);
          }

          this.state = LoadingState.Error;
        })
    })
  }

  reloadFunction: () => void = () => console.log("Default UserModel View");

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

  getUser(): User {
    return <User>this.user;
  }

  getImageUrl(): string {
    if(!this.user.imageUrl) {
      return "/assets/placeholder.png";
    } else {
      return this.user.imageUrl;
    }
  }
}
