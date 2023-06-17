import { Injectable } from '@angular/core';
import {OK, Result} from "./model/Result";
import {User} from "./model/User";
import {RestService} from "./rest.service";
import {resolve} from "@angular/compiler-cli";
import {delay} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'platform',

})
export class AuthService {
  private restService: RestService;

  constructor(restService: RestService) {
    this.restService = restService;
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
    return new Promise<boolean>((resolve) =>  {
      setTimeout(() => {
        this.isAuth = true;
        resolve(true);
      }, 1000)
    })
  }

  public logout() {
    this.isAuth = false;
  }



  public getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.isAuth) {
        this.restService.loadUser(0)
          .then(user => resolve(user))
          .catch(error => reject(error));
      } else {
        reject("Nicht angemeldet")
      }
    })
  }
}
