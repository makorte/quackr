import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../model/Post";
import {openCreatePostForm} from "../openCreatePostForm";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.sass']
})
export class PostsViewComponent {
   reloadFunction: () => void = () => console.log("Default Posts View");

  constructor(private router: Router, private activeRoute: ActivatedRoute,private authService: AuthService) {
  }


  setReload(reloadFunction: () => void) {
    this.reloadFunction = reloadFunction;
  }

  protected readonly openCreatePostForm = openCreatePostForm;

  isAuth() {
    return this.authService.isAuthenticated();
  }

  openCreatePostDialog() {
    openCreatePostForm();
  }
}
