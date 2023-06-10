import { Component } from '@angular/core';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.sass']
})
export class PostsViewComponent {
  openCreatePostForm() {
    let dialog: HTMLElement | null = document.getElementById("create-post-dialog");
    if (dialog){
      (<HTMLDialogElement>dialog).showModal();
    }
  }
}
