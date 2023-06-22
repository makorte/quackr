import {Component, Input} from '@angular/core';
import {Post} from "../../model/post.model";
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

  @Input() post: Post;
  @Input() enableLinks: boolean = true;


  /**
   * Navigiert zur Post-Detail-Seite
   */
  toPostDetail() {
    let frag = this.post == null ? '' : this.post.id == null ? '' : this.post.id.toString();

    this.router.navigate(["post-details", this.post.id], {
      fragment: frag
    });
  }

  getImageUrl(): string {
    if (!this.post.imageUrl) {
      return "/assets/placeholder.png";
    } else {
      return this.post.imageUrl;
    }
  }

}
