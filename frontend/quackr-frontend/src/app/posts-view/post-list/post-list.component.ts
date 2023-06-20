import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from "../../shared/service/rest.service";
import {PostModel} from "../../shared/model/post.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  public posts: PostModel[] = [];

  @Output() reloadFunction = new EventEmitter<() => void>();

  constructor(private restService: RestService, private activeRoute: ActivatedRoute) {

    this.loadPosts();
  }

  loadPosts() {
    let result = this.restService.loadPosts();
    result.then(value => {
      this.posts = value
      setTimeout(() => {
        this.activeRoute.fragment.subscribe(value => {
          let element = document.getElementById("post-" + value);
          if (element == null) return;
          element.scrollIntoView({
            block: "start"
          });
        })
      }, 10)

    });
  }

  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }



  ngOnInit(): void {
    this.reloadFunction.emit(this.loadPosts);
  }
}