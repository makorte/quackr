import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {LikeStatus, Post} from "../../model/Post";
import {User} from "../../model/User";
import {RestService} from "../../rest.service";
import {LoadingState} from "../../model/LoadingState";

@Component({
  selector: 'app-post-thread-list',
  templateUrl: './post-thread-list.component.html',
  styleUrls: ['./post-thread-list.component.sass']
})
export class PostThreadListComponent implements OnInit, OnChanges{

  @Input() post: Post = new Post("",0,0,LikeStatus.NONE, new User(-1, [], "", "",""));
  @Output() onOpenKommentarDialog = new EventEmitter<Post>();
  @Output() reloadFunction = new EventEmitter<() => void>();

  private restService: RestService;
  public state: LoadingState = LoadingState.Loading;
  public kommentare: Post[] = [];
  public thread: Post[] = [];

  constructor(restService: RestService) {
    this.restService = restService;
  }

  ngOnInit(): void {
    this.reloadFunction.emit(() => {
      console.log("reload Thread")
      this.ngOnChanges()
    });
  }

  public ngOnChanges() {
    this.reloadFunction.emit(() => {
      console.log("reload Thread")
      this.ngOnChanges()
    });

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
        .then(() => this.state = LoadingState.Loaded);
      });

  }
  openKommentarDialog(post: Post) {
    console.log("open Create Kommentar Post Thread")
    this.onOpenKommentarDialog.emit(post);
  }


  protected readonly LoadingState = LoadingState;


}
