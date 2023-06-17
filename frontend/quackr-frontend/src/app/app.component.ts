import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../model/User";
import {ChildrenOutletContexts} from "@angular/router";
import {slideInAnimation} from "../transition";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [slideInAnimation]
})
export class AppComponent {
  private authService: AuthService;

  public showSidebar = false;

  private user: User | null = null;

  private contexts: ChildrenOutletContexts;

  constructor(authService: AuthService, contexts: ChildrenOutletContexts) {
    this.contexts = contexts;
    this.authService = authService;
  }

  showSideBar() {
    this.showSidebar = !this.showSidebar;
  }

  isAuth() {
    let authenticated = this.authService.isAuthenticated();

    return authenticated;
  }

  hasUser(){
    return this.user != null;
  }
   getUser() {
    return this.user;
   }

  protected readonly Promise = Promise;
  protected readonly User = User;


  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

