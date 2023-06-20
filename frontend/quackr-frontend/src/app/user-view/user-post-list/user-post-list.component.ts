import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from "../../shared/service/rest.service";
import {PostModel} from "../../shared/model/post.model";
import {UserModel} from "../../shared/model/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.sass']
})
export class UserPostListComponent implements OnInit {

  private posts: PostModel[] = [];
  @Output() private reloadFunction = new EventEmitter<() => void>();

  constructor(private router: Router,private route: ActivatedRoute,private restService: RestService) {
    this.loadPosts();
  }

  getUserID(funk: (username: string) => void) {
    let id = NaN;
    this.route.params.subscribe({
      next: params => {
        funk( params["id"]);
      }
    });
  }

  loadUser(username: string): Promise<UserModel> {
    return this.restService.loadUser(username);
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

  getPosts() {
    return this.posts;
  }
}
