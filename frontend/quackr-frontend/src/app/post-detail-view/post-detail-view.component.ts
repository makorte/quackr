import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../shared/model/post.model";
import {LoadingState} from "../shared/model/LoadingState";
import {openCreatePostForm} from "../shared/openCreatePostForm";
import {AuthService} from "../shared/service/auth.service";
import {PostService} from "../shared/service/post.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-post-detail-view',
  templateUrl: './post-detail-view.component.html',
  styleUrls: ['./post-detail-view.component.sass']
})
export class PostDetailViewComponent implements OnInit {
  private post: Post | null = null;
  private state: LoadingState = LoadingState.Loading;

  reloadFunction: () => void = () => {
    console.log("Default detail view")
  };

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: params => {
        const id = Number(params["id"]);
        if (isNaN(id)) {
          this.router.navigate(["posts"]);
        } else {
          this.postService.getPost(id)
            .then(post => {
              this.post = post;
              this.state = LoadingState.Loaded;
              console.log("post");
              console.log(post)
              setTimeout(() => {
                this.route.fragment.subscribe(value => {
                  let element = document.getElementById("post-" + value);
                  if (element == null) return;
                  element.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                  });
                })
              }, 10)
            })
            .catch((err: HttpErrorResponse) => {
              if(err.status === 403) {
                this.router.navigate(["/login"])
              } else {
                console.log(err)
                this.state = LoadingState.Error;
              }
            })
        }
      }
    });
  }

  backToOverview() {
    let frag = this.post == null ? '' : this.post.id == null ? '' : this.post.id.toString();

    this.router.navigate(["posts"], {
      fragment: frag
    })
  }

  setReload(reloadFunction: () => void) {
    this.reloadFunction = reloadFunction;
  }

  protected readonly LoadingState = LoadingState;
  protected readonly openCreatePostForm = openCreatePostForm;

  isAuth() {
    return this.authService.isAuthenticated();
  }

  openCreatePostDialog() {
    openCreatePostForm();
  }

  isLoaded(): boolean {
    return this.state == LoadingState.Loaded && this.post != null;
  }

  getPost(): Post {
    return <Post>this.post;
  }

  isLoading() {
    return this.state == LoadingState.Loading;
  }
}

