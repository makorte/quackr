import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/model/user.model";
import {Post} from "../../shared/model/post.model";
import {openCreatePostForm} from "../../shared/openCreatePostForm";
import {AuthService} from "../../shared/service/auth.service";
import {PostService} from "../../shared/service/post.service";
import {AsyncPipe} from "@angular/common";
import {UserService} from "../../shared/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit {
  private user: User;
  private loading = true;
  private error: string;

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly asyncPipe: AsyncPipe,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const username: string = params.get("username")

      this.userService.getUserByUsername(username)
        .then(user => {
          this.user = user
          this.loading = false;
          this.postService.getPostsByUsername(username);
        })
        .catch(async (error: HttpErrorResponse) => {
          this.loading = false;
          if(error.status === HttpStatusCode.Forbidden) {
            this.authService.logout();
            await this.router.navigate(["/login"])
          }
          console.error(error)
          this.error = "Es ist ein Fehler beim Laden des Nutzers aufgetreten. Bitte versuche es später erneut.";
        });
    })
  }

  getPosts(): Post[] {
    return this.asyncPipe.transform(this.postService.userPosts$);
  }

  isAuth(): boolean {
    return !!this.asyncPipe.transform(this.authService.currentUser$);
  }

  openCreatePostDialog() {
    openCreatePostForm();
  }

  getUser(): User {
    return this.user;
  }

  getImageUrl(): string {
    if (!this.user.imageUrl) {
      return "/assets/placeholder.png";
    } else {
      return this.user.imageUrl;
    }
  }

  getReloadFunction(): Function {
    return () => this.postService.getPostsByUsername(this.user.username)
  }

  getRedirectPath(): string {
    return `/user/${this.user.username}`;
  }

  isLoading(): boolean {
    return this.loading;
  }

  hasError(): boolean {
    return !!this.error;
  }

  getError(): string {
    return this.error;
  }
}
