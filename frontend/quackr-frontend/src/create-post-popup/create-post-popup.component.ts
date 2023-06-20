import {Component, Input} from '@angular/core';
import {RestService} from "../rest.service";
import { Post} from "../model/Post";
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

  @Input() reloadFunction: () => void  = () => {console.log("Default post popup")};
  url: string | null = null;

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
    // this.closeDialog();
    this.authService.getCurrentUser()
      .then(user => {
        this.restService.createPost(new Post(this.text,  user, new Date().toLocaleTimeString(),null,  this.url)).then((post) => {
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


}
