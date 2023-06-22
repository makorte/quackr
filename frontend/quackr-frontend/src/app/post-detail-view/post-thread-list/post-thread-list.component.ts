import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Post} from "../../shared/model/post.model";
import {LoadingState} from "../../shared/model/LoadingState";

@Component({
  selector: 'app-post-thread-list',
  templateUrl: './post-thread-list.component.html',
  styleUrls: ['./post-thread-list.component.sass']
})
export class PostThreadListComponent implements OnInit, OnChanges {

  @Input() post: Post;
  @Output() reloadFunction = new EventEmitter<() => void>();

  private state: LoadingState = LoadingState.Loading;


  constructor() {
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
