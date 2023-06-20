import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from "../../rest.service";
import {Post} from "../../model/Post";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.sass']
})
export class UserPostListComponent implements OnInit{
  private restService: RestService;

  public posts: Post[] = [];
  @Output() reloadFunction = new EventEmitter<() => void>();

  route: ActivatedRoute;
  router: Router;

  constructor(router: Router, route: ActivatedRoute, restService: RestService) {
    this.restService = restService;
    this.route = route;
    this.router = router;
    this.loadPosts();
  }

  getUserID(funk: (userId: number) => void) {
    let id = NaN;
    this.route.params.subscribe({
      next: params => {
        id = Number(params["id"]);
        funk(id);
      }
    });
  }

  loadUser(id: number):Promise<User> {
    return this.restService.loadUser(id);
  }

  loadPosts() {
     this.getUserID(
       (userID) =>
       this.loadUser(userID).then(user => this.restService.loadPostsFromUser(user).then(posts => this.posts = posts))
      );
  }




  noPostsLoaded(): boolean {
    return this.posts.length == 0;
  }



  protected readonly onabort = onabort;

  ngOnInit(): void {
    this.reloadFunction.emit(this.loadPosts);
  }

}
