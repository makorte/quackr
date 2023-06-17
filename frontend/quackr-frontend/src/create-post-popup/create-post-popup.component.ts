import {Component, Input} from '@angular/core';
import {RestService} from "../rest.service";
import {LikeStatus, Post} from "../model/Post";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.sass']
})
export class CreatePostPopupComponent {
  text: string = "";
  isError: boolean = false;
  private restService: RestService;
  private authService: AuthService;

  @Input() kommentarVon: Post | null = null;
  @Input() reloadFunction: () => void  = () => {console.log("Default post popup")};
  url: string | null = null;
  icon: File | null = null;

  constructor(restService: RestService, authService: AuthService) {
    this.restService = restService;
    this.authService = authService;
  }

  closeDialog() {
    let htmlElement: HTMLElement | null = document.getElementById("create-post-dialog");
    if (htmlElement) {
      let dialog = <HTMLDialogElement>htmlElement;
      dialog.close();
      this.reset();
    }
  }

  createPost() {
    console.log("url:" + this.url)
    console.log("file:" + this.icon)
    // this.closeDialog();
    this.authService.getCurrentUser()
      .then(user => {
        this.restService.createPost(new Post(this.text, 0, 0, LikeStatus.NONE, user, null, this.kommentarVon, this.url)).then((post) => {
          console.log("reload:"+this.reloadFunction)
          this.reloadFunction();
          this.closeDialog()
        })
        .catch((error) =>{
          console.log(error)
          this.isError = true
        } );

      })
      .catch(error => {
        console.log(error)
        this.isError = true
      });
  }

  reset() {
    this.text = "";
    this.isError = false;
  }

  isKommentar() {
    return this.kommentarVon != null;
  }

}
