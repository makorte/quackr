import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @Input() reloadFunction: Function = () => {};
  @ViewChild('message') messageInput: ElementRef;
  @ViewChild('imageUrl') imageUrlInput: ElementRef;

  user: User;
  isError: boolean = false;

  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => this.user = user);
  }

  closeDialog() {
    let htmlElement: HTMLElement = document.getElementById("create-post-dialog");
    if (htmlElement) {
      let dialog = <HTMLDialogElement> htmlElement;
      dialog.close();
      this.reset();
    }
  }

  createPost(message: string, imageUrl: string) {
    this.postService.createPost(message, imageUrl)
      .then(() => {
        this.reloadFunction();
        this.closeDialog()
      })
      .catch(async (error: HttpErrorResponse) => {
        if(error.status === 403) {
         await  this.router.navigate(["/login"])
        }
        console.error(error)
        this.isError = true
      })
  }

  reset() {
    this.isError = false;
    this.messageInput.nativeElement.value = "";
    this.imageUrlInput.nativeElement.value = "";
  }
}
