import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LikeStatus, Post} from "../../model/Post";
import {User} from "../../model/User";
import {RestService} from "../../rest.service";
import {LoadingState} from "../../model/LoadingState";

@Component({
  selector: 'app-post-thread-list',
  templateUrl: './post-thread-list.component.html',
  styleUrls: ['./post-thread-list.component.sass']
})
export class PostThreadListComponent implements OnChanges{

  @Input() post: Post = new Post("",0,0,LikeStatus.NONE, new User(-1, [], "", "",""));
  private restService: RestService;
  public state: LoadingState = LoadingState.LOADING;
  public kommentare: Post[] = [];
  public thread: Post[] = [];

  constructor(restService: RestService) {
    this.restService = restService;
  }

  ngOnChanges() {
    this.thread = [];
    this.kommentare = [];
    console.log("Thread von:"+this.post.id);
    if (this.post.id == null) return;
    this.restService.loadKommentare(this.post.id)
      .then(kommentare => {
        this.kommentare = kommentare;
        console.log(kommentare);
        new Promise((resolve) => {
          let currPost = this.post;
          while (currPost.kommentarVon != null) {
            console.log("add Thread")
            console.log(currPost.kommentarVon)
            this.thread.unshift(currPost.kommentarVon);
            currPost = currPost.kommentarVon;
          }
          console.log(this.thread)
          resolve(null)
        })
        .then(() => this.state = LoadingState.LOADED);
      });

  }

  protected readonly LoadingState = LoadingState;
}
