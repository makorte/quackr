import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Post} from "../../model/Post";
import {User} from "../../model/User";
import {RestService} from "../../rest.service";
import {LoadingState} from "../../model/LoadingState";

@Component({
  selector: 'app-post-thread-list',
  templateUrl: './post-thread-list.component.html',
  styleUrls: ['./post-thread-list.component.sass']
})
export class PostThreadListComponent implements OnInit, OnChanges{

  @Input() post: Post = new Post("",new User(-1, "", ""));
  @Output() reloadFunction = new EventEmitter<() => void>();

  public state: LoadingState = LoadingState.Loading;


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


}
