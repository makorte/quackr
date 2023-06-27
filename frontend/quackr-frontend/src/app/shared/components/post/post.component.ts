import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Post} from "../../model/post.model";
import {AuthService} from "../../service/auth.service";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {PostService} from "../../service/post.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent {
  @Input() post: Post;
  @Input() enableLinks: boolean = true;
  @Input() reloadFunction: Function;
  @Input() redirectTo: string;
  @ViewChild('deleteDialog') deleteDialog: ElementRef;

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly asyncPipe: AsyncPipe,
    private readonly router: Router
  ) {
  }

  getImageUrl(): string {
    if (!this.post.imageUrl) {
      return "/assets/placeholder.png";
    } else {
      return this.post.imageUrl;
    }
  }

  hasEditAccess(): boolean {
    const currentUser = this.asyncPipe.transform(this.authService.currentUser$);
    return currentUser.role === "ROLE_ADMIN" || currentUser.username === this.post.username;
  }

  onDelete(): void {
    (<HTMLDialogElement>this.deleteDialog.nativeElement).showModal();
  }

  onDeleteAbort(): void {
    (<HTMLDialogElement>this.deleteDialog.nativeElement).close();
  }

  onDeleteConfirm(): void {
    this.postService.deletePost(this.post.id)
      .then(async () => {
        this.reloadFunction();
        (<HTMLDialogElement>this.deleteDialog.nativeElement).close();
        await this.router.navigate([this.redirectTo]);
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(["/login"])
        }
        console.error(error);
      })

  }
}
