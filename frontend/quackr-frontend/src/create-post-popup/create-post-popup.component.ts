import { Component } from '@angular/core';
import {RestService} from "../rest.service";
import {Post} from "../model/Post";

@Component({
  selector: 'app-create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.sass']
})
export class CreatePostPopupComponent {
  text: string = "";
  isError: boolean = false;
  private restService: RestService;
  constructor(restService: RestService) {
    this.restService = restService;
  }

  closeDialog() {
    let htmlElement: HTMLElement | null = document.getElementById("create-post-dialog");
    if (htmlElement){
      let dialog = <HTMLDialogElement>htmlElement;
      dialog.close();
      this.reset();
    }
  }

  createPost() {
    this.restService.createPost(new Post(this.text, 0 , 0))
      .then((post) => this.closeDialog())
      .catch((error) => this.isError = true);
    // this.closeDialog();
  }

  reset() {
    this.text = "";
    this.isError = false;
  }
}
