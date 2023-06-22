import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../model/post.model";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getPosts(): Promise<Post[]> {
    return lastValueFrom(this.httpClient.get<Post[]>(`${environment.baseAPIUrl}/posts`))
  }

  public getPostsByUsername(username: string): Promise<Post[]> {
    return lastValueFrom(this.httpClient.get<Post[]>(`${environment.baseAPIUrl}/users/${username}/posts`))
  }

  public getPost(id: number): Promise<Post> {
    return lastValueFrom(this.httpClient.get<Post>(`${environment.baseAPIUrl}/posts/${id}`));
  }

  public createPost(message: String, imageUrl: String): Promise<Post> {
    return lastValueFrom(this.httpClient.post<Post>(`${environment.baseAPIUrl}/posts`, {message, imageUrl}));
  }
}
