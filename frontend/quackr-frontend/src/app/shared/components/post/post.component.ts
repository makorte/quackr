import {Component, Input} from '@angular/core';
import {PostModel} from "../../model/post.model";
import {UserModel} from "../../model/user.model";
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

  @Input() post: PostModel = new PostModel("Lädt...", new UserModel("", ""));
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
