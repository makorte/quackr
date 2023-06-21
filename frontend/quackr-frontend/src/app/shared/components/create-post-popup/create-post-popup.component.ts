import {Component, Input} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {RestService} from "../../service/rest.service";
import {PostModel} from "../../model/post.model";

@Component({
  selector: 'app-create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.sass']
})
export class CreatePostPopupComponent {
  text: string = "";
  isError: boolean = false;

  @Input() reloadFunction: () => void = () => {
    console.log("Default post popup")
  };
  url: string | null = null;

  constructor(private restService: RestService,private authService: AuthService) {
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
        this.restService.createPost(new PostModel(this.text, user, new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString(), null, this.url)).then((post) => {
          console.log("reload:" + this.reloadFunction)
          this.reloadFunction();
          this.closeDialog()
        })
          .catch((error) => {
            console.log(error)
            this.isError = true
          });

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
