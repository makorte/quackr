import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.sass']
})
export class PostsViewComponent {
  private router: Router;
  private activeRoute: ActivatedRoute;

  constructor(router: Router, activeRoute: ActivatedRoute) {
    this.router = router;
    this.activeRoute = activeRoute;
  }

  openCreatePostForm() {
    let dialog: HTMLElement | null = document.getElementById("create-post-dialog");
    if (dialog) {
      (<HTMLDialogElement>dialog).showModal();
    }
  }

}
