import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent {

  @Input() text: string = "";
  @Input() likes: number = 0;
  @Input() hasLiked: boolean = false;
  @Input() dislikes: number = 0;
  @Input() hasDisliked: boolean = false;

  @Output() onLikeChange = new EventEmitter<boolean>();
  @Output() onDislikeChange = new EventEmitter<boolean>();


  likeChange() {
    this.hasLiked = !this.hasLiked;

    if (this.hasLiked) {
      this.likes++;
    } else {
      this.likes--;
    }
    this.onLikeChange.emit(this.hasLiked);
    if (this.hasLiked && this.hasDisliked) {
      this.dislikeChange();
    }
  }

  dislikeChange() {
    this.hasDisliked = !this.hasDisliked;

    if (this.hasDisliked) {
      this.dislikes++;
    } else {
      this.dislikes--;
    }
    this.onDislikeChange.emit(this.hasDisliked);

    if (this.hasLiked && this.hasDisliked) {
      this.likeChange();
    }
  }
}
