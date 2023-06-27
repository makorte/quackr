import {Component, OnInit} from '@angular/core';
import {openCreatePostForm} from "../shared/openCreatePostForm";
import {AuthService} from "../shared/service/auth.service";
import {PostService} from "../shared/service/post.service";
import {AsyncPipe} from "@angular/common";
import {Post} from "../shared/model/post.model";

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.sass']
})
export class PostsViewComponent implements OnInit{
  currentPost: Post;

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private asyncPipe: AsyncPipe
  ) {
  }

  ngOnInit() {
    this.postService.getPosts();
  }

  getPosts(): Post[] {
    return this.asyncPipe.transform(this.postService.posts$);
  }

  isAuth(): boolean {
    return !!this.asyncPipe.transform(this.authService.currentUser$);
  }

  openCreatePostDialog() {
    openCreatePostForm();
  }

  getReloadFunction(): Function {
    return () => this.postService.getPosts();
  }
}
