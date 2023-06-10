import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../model/Post";
import {RestService} from "../rest.service";

@Component({
  selector: 'app-post-detail-view',
  templateUrl: './post-detail-view.component.html',
  styleUrls: ['./post-detail-view.component.sass']
})
export class PostDetailViewComponent {
  public post: Post|null = null;

  state: LoadingState = LoadingState.Loading;

  constructor(private router: Router, private route : ActivatedRoute, restService: RestService) {

    this.route.params.subscribe({
      next: params => {
        console.log(params["id"]);
      const id = Number(params["id"]);
        if (isNaN(id)) {
          this.router.navigate(["app", "posts"]);
        }else {
          restService.loadPost(id)
            .then(post =>{
              this.post = post;
              this.state = LoadingState.Loaded;
            })
            .catch(err => {
              this.state = LoadingState.Error;
            })
          ;
        }
      }
    });
  }

  backToOverview() {
    this.router.navigate(["app", "posts"])
  }
  protected readonly LoadingState = LoadingState;
}

enum LoadingState {
  Loading,
  Loaded,
  Error
}
