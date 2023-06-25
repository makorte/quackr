import {Component, Input} from '@angular/core';
import {Post} from "../../model/post.model";
import {AuthService} from "../../service/auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent {
  @Input() post: Post;
  @Input() enableLinks: boolean = true;

  constructor(
    private readonly authService: AuthService,
    private readonly asyncPipe: AsyncPipe
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
    return currentUser.isAdmin() || currentUser.username === this.post.username;
  }
}
