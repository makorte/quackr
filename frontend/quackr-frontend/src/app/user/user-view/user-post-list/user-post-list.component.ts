import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from "../../../shared/model/post.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../shared/service/post.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.sass']
})
export class UserPostListComponent implements OnInit {

  private posts: Post[] = [];
  @Output() private reloadFunction = new EventEmitter<() => void>();

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) {
    this.loadPosts();
  }

  ngOnInit(): void {
    this.reloadFunction.emit(this.loadPosts);
  }

  loadPosts() {
    this.route.paramMap.subscribe(params => {
      const username = params.get("username")
      this.postService.getPostsByUsername(username)
        .then(posts => this.posts = posts)
        .catch((error: HttpErrorResponse) => {
          if(error.status === 403) {
            this.router.navigate(["/login"])
          } else {
            console.log(error)
          }
        });
    })
  }

  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }

  protected readonly onabort = onabort;

  getPosts() {
    return this.posts;
  }
}
