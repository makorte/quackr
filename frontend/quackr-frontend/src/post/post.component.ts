import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LikeStatus, Post} from "../model/Post";
import {state} from "@angular/animations";
import {User} from "../model/User";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent {

  @Input() post: Post = new Post("Lädt...", 0, 0 , LikeStatus.NONE, new User(-1, [],"","",""));

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

  getLikeButtonClasses() {
    return this.post.hasLiked() ? "liked btn" : "btn";
  }

  getDislikeButtonClasses() {
    return this.post.hasDisliked() ? "disliked btn" : "likeButton btn";
  }
}
