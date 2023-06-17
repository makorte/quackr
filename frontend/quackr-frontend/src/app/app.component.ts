import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../model/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private authService: AuthService;

  public showSidebar = false;

  private user: User | null = null;

  constructor(authService: AuthService) {
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


}

