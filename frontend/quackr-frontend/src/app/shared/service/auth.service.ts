import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'platform',

})
export class AuthService implements OnInit, OnDestroy {

  constructor(private restService: RestService) {
  }

  private isAuth = false;

  public isAuthenticated(): boolean {
    return this.isAuth;
  }

  public register(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuth = true;
        resolve(true);
      }, 1000)
    })
  }

  public login(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.isAuth = Math.random() > 0.5;
        console.log(this.isAuth)
        resolve(this.isAuth);
      }, 1000)
    })
  }

  public logout() {
    this.isAuth = false;
  }


  public getCurrentUser(): Promise<UserModel> {
    return new Promise<UserModel>((resolve, reject) => {
      if (this.isAuth) {
        this.restService.loadUser("TestNutzer")
          .then(user => resolve(user))
          .catch(error => reject(error));
      } else {
        reject("Nicht angemeldet")
      }
    })
  }

  ngOnDestroy(): void {
    console.log("on Destroy auth")
  }

  ngOnInit(): void {
    console.log("on Init auth")
  }
}
