import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user.model";
import {PostService} from "../../service/post.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.sass']
})
export class CreatePostPopupComponent implements OnInit {
  user: User;
  isError: boolean = false;

  @Input() reloadFunction: () => void = () => {
    console.log("Default post popup")
  };

  constructor(private postService: PostService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => this.user = user)
  }

  closeDialog() {
    let htmlElement: HTMLElement | null = document.getElementById("create-post-dialog");
    if (htmlElement) {
      let dialog = <HTMLDialogElement>htmlElement;
      dialog.close();
      this.reset();
    }
  }

  createPost(message: string, imageUrl: string) {
    this.postService.createPost(message, imageUrl)
      .then(() => {
        console.log("reload:" + this.reloadFunction)
        this.reloadFunction();
        this.closeDialog()
        console.log("post created")
      })
      .catch((error: HttpErrorResponse) => {
        if(error.status === 403) {
          this.router.navigate(["/login"])
        }
        console.log(error)
        this.isError = true
      })
  }

  reset() {
    this.isError = false;
  }
}
