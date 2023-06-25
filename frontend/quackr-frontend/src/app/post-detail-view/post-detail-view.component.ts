import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../shared/model/post.model";
import {LoadingState} from "../shared/model/LoadingState";
import {PostService} from "../shared/service/post.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-post-detail-view',
  templateUrl: './post-detail-view.component.html',
  styleUrls: ['./post-detail-view.component.sass']
})
export class PostDetailViewComponent implements OnInit {
  private post: Post | null;
  private state: LoadingState = LoadingState.Loading;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly postService: PostService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: async (params) => {
        const id = Number(params.get("id"));
        if (isNaN(id)) {
          await this.router.navigate(["posts"]);
        } else {
          this.postService.getPost(id)
            .then(post => {
              this.post = post;
              this.state = LoadingState.Loaded;
            })
            .catch((err: HttpErrorResponse) => {
              if (err.status === 403) {
                this.router.navigate(["/login"])
              } else {
                console.error(err)
                this.state = LoadingState.Error;
              }
            })
        }
      }
    });
  }

  async backToOverview(): Promise<void> {
    await this.router.navigate(["posts"])
  }

  isLoaded(): boolean {
    return this.state == LoadingState.Loaded && this.post != null;
  }

  getPost(): Post {
    return <Post>this.post;
  }

  isLoading(): boolean {
    return this.state == LoadingState.Loading;
  }

  getReloadFunction(): Function {
    return () => this.postService.getPosts();
  }
}

