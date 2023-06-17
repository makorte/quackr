import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LikeStatus, Post} from "../model/Post";
import {openCreatePostForm} from "../openCreatePostForm";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.sass']
})
export class PostsViewComponent {
  private router: Router;
  private activeRoute: ActivatedRoute;
  post: Post|null =null;
   reloadFunction: () => void = () => console.log("Default Posts View");
  private authService: AuthService;

  constructor(router: Router, activeRoute: ActivatedRoute, authService: AuthService) {
    this.router = router;
    this.activeRoute = activeRoute;
    this.authService = authService;
  }

 openKommentarDialog(post: Post) {
    this.post = post;
   let dialog: HTMLElement | null = document.getElementById("create-post-dialog");
   if (dialog) {
     (<HTMLDialogElement>dialog).showModal();
   }
 }

  setReload(reloadFunction: () => void) {
    this.reloadFunction = reloadFunction;
  }

  protected readonly openCreatePostForm = openCreatePostForm;

  isAuth() {
    return this.authService.isAuthenticated();
  }

  openCreatePostDialog() {
    this.post = null;
    openCreatePostForm();
  }
}
