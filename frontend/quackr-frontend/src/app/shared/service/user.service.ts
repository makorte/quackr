import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {
  }

  public getUserByUsername(username: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${environment.baseAPIUrl}/users/${username}`));
  }

  public register(username: string, password: string, imageUrl: string) {
    return this.httpClient.post(`${environment.baseAPIUrl}/auth/register`, {username, password, imageUrl});
  }
}
