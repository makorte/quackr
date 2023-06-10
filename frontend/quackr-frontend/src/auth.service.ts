import { Injectable } from '@angular/core';
import {OK, Result} from "./model/Result";
import {User} from "./model/User";
import {RestService} from "./rest.service";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private restService: RestService;

  constructor(restService: RestService) {
    this.restService = restService;
  }

  public isAuthenticated(): boolean {
    return true;
  }

  public getCurrentUser(): Promise<User> {
    return this.restService.loadUser(0);
  }
}
