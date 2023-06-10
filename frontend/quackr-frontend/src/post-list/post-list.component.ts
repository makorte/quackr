import {Component} from '@angular/core';
import {RestService} from "../rest.service";
import {Post} from "../model/Post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent {
  private restService: RestService;

  public posts: Post[] = [];

  constructor(restService: RestService) {
    this.restService = restService;
    this.loadPosts();
  }

  loadPosts() {
    let result = this.restService.loadPosts();
    result.then(value => this.posts = value);
  }

  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }

  postLikeChange(post: Post) {
    this.restService.postLikeChange(post);
  }

  protected readonly onabort = onabort;
}
