import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from "../model/Post";
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

  @Input() post: Post = new Post("Lädt...",  new User(-1, "", ""));
  @Input() enableLinks: boolean = true;


  /**
   * Navigiert zur Post-Detail-Seite
   */
  toPostDetail() {
    let frag = this.post == null ? '' : this.post.id == null ? '' : this.post.id.toString();

    this.router.navigate(["app", "post-details", this.post.id], {
      fragment: frag
    });
  }

}
