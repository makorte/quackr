import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LikeStatus, Post} from "../model/Post";
import {state} from "@angular/animations";
import {User} from "../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  @Input() post: Post = new Post("Lädt...", 0, 0 , LikeStatus.NONE, new User(-1, [],"","",""));
  @Input() enableLinks: boolean = true;

  @Output() onLikeStatusChange = new EventEmitter<Post>();


  likeChange() {
    console.log("like change post comp")
    this.post.likeChange();
    this.onLikeStatusChange.emit(this.post);
  }

  dislikeChange() {
    this.post.dislikeChange();
    this.onLikeStatusChange.emit(this.post);
  }

  toPostDetail() {
    this.router.navigate(["app","post-details",this.post.id]);
  }
}
