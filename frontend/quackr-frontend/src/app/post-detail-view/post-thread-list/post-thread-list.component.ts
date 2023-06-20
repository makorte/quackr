import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PostModel} from "../../shared/model/post.model";
import {UserModel} from "../../shared/model/user.model";
import {RestService} from "../../shared/service/rest.service";
import {LoadingState} from "../../shared/model/LoadingState";

@Component({
  selector: 'app-post-thread-list',
  templateUrl: './post-thread-list.component.html',
  styleUrls: ['./post-thread-list.component.sass']
})
export class PostThreadListComponent implements OnInit, OnChanges {

  @Input() post: PostModel = new PostModel("", new UserModel("", ""));
  @Output() reloadFunction = new EventEmitter<() => void>();

  private state: LoadingState = LoadingState.Loading;


  constructor(private restService: RestService) {
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

    this.state = LoadingState.Loaded;
  }


  protected readonly LoadingState = LoadingState;


  isLoading(): boolean {
    return this.state == LoadingState.Loading;
  }

  isLoaded(): boolean {
    return this.state == LoadingState.Loaded;
  }
}
