import { Component } from '@angular/core';
import {Post} from "../model/Post";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  openCreatePostForm() {
    let dialog: HTMLElement | null = document.getElementById("create-post-dialog");
    if (dialog){
      (<HTMLDialogElement>dialog).showModal();
    }
  }
}
