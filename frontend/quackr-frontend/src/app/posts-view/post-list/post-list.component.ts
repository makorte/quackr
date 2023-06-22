import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Post} from "../../shared/model/post.model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../shared/service/post.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  public posts: Post[] = [];
  public loggedIn = false;

  @Output() reloadFunction = new EventEmitter<() => void>();

  constructor(private postService: PostService, private activeRoute: ActivatedRoute) {
    this.loadPosts();
  }

  ngOnInit(): void {
    this.reloadFunction.emit(this.loadPosts);
  }

  loadPosts(): void {
    this.postService.getPosts().then(value => {
      this.posts = value
      this.loggedIn = true;
      setTimeout(() => {
        this.activeRoute.fragment.subscribe(value => {
          let element = document.getElementById("post-" + value);
          if (element == null) return;
          element.scrollIntoView({
            block: "start"
          });
        })
      }, 10)
    })
      .catch((error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.loggedIn = false;
        }
      })
  }

  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }
}
