import {Component, Input} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Post} from "../model/Post";
import {RestService} from "../rest.service";
import {LoadingState} from "../model/LoadingState";

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
        const id = Number(params["id"]);
        if (isNaN(id)) {
          this.router.navigate(["app", "posts"]);
        }else {
          restService.loadPost(id)
            .then(post =>{
              this.post = post;
              this.state = LoadingState.Loaded;
              setTimeout(()  => {
                this.route.fragment.subscribe(value => {
                  let element = document.getElementById("post-"+value);
                  if (element == null) return;
                  element.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                  });
                })
              },10)
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
    let frag = this.post == null ? '' : this.post.id == null ? '' : this.post.id.toString();

    this.router.navigate(["app", "posts"], {
      fragment: frag
    })
  }

  protected readonly LoadingState = LoadingState;
}

