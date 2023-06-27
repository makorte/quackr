import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Post} from "../model/post.model";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsSubject: BehaviorSubject<Post[]>;
  posts$: Observable<Post[]>;

  userPostsSubject: BehaviorSubject<Post[]>;
  userPosts$: Observable<Post[]>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.postsSubject = new BehaviorSubject<Post[]>([]);
    this.posts$ = this.postsSubject.asObservable();

    this.userPostsSubject = new BehaviorSubject<Post[]>([]);
    this.userPosts$ = this.userPostsSubject.asObservable();
  }

  public getPosts(): void {
    this.httpClient.get<Post[]>(`${environment.baseAPIUrl}/posts`).subscribe({
      next: posts => this.postsSubject.next(this.orderPosts(posts)),
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.authService.logout();
        }
        console.error(err);
        this.postsSubject.next([])
      }
    })
  }

  public getPostsByUsername(username: string): void {
    this.httpClient.get<Post[]>(`${environment.baseAPIUrl}/users/${username}/posts`).subscribe({
      next: posts => this.userPostsSubject.next(this.orderPosts(posts)),
      error: async (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.authService.logout();
          await this.router.navigate(["/login"])
        }
        console.error(err);
        this.userPostsSubject.next([])
      }
    })
  }

  public getPost(id: number): Promise<Post> {
    return lastValueFrom(this.httpClient.get<Post>(`${environment.baseAPIUrl}/posts/${id}`));
  }

  public createPost(message: String, imageUrl: String): Promise<Post> {
    return lastValueFrom(this.httpClient.post<Post>(`${environment.baseAPIUrl}/posts`, {message, imageUrl}));
  }

  public updatePost(id: number, message: String, imageUrl: string): Promise<Post> {
    return lastValueFrom(this.httpClient.put<Post>(`${environment.baseAPIUrl}/posts/${id}`, {message, imageUrl}));
  }

  public deletePost(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete(`${environment.baseAPIUrl}/posts/${id}`));
  }

  private orderPosts(posts: Post[]): Post[] {
    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
