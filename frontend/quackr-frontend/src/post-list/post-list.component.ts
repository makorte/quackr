import {Component} from '@angular/core';
import {RestService} from "../rest.service";
import {Post} from "../model/Post";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent {
  private restService: RestService;

  public posts: Post[] = [];
  private activeRoute: ActivatedRoute;

  constructor(restService: RestService, activeRoute: ActivatedRoute) {
    this.restService = restService;
    this.activeRoute = activeRoute;
    this.loadPosts();
  }

  loadPosts() {
    let result = this.restService.loadPosts();
    result.then(value => {
      this.posts = value
      setTimeout(()  => {
        this.activeRoute.fragment.subscribe(value => {
          let element = document.getElementById("post-"+value);
          if (element == null) return;
          element.scrollIntoView({
            block: "start"
          });
        })
      },10)

    });
  }

  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }

  postLikeChange(post: Post) {
    this.restService.postLikeChange(post);
  }

  protected readonly onabort = onabort;
}
