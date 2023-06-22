import {Injectable} from '@angular/core';
import {User} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {AuthenticationResponse} from "../model/authenticationResponse.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'platform',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private readonly httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public getJwt(): String {
    return localStorage.getItem("jwt");
  }

  public isAuthenticated(): boolean {
    return !!this.currentUserSubject.getValue();
  }

  public login(username: String, password: String) {
    return this.httpClient.post<AuthenticationResponse>(`${environment.baseAPIUrl}/auth/authenticate`, {
      username,
      password
    }).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
        localStorage.setItem("jwt", response.jwt);
      }),
      map(() => true)
    )
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem("jwt")
  }
}
