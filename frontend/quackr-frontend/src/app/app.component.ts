import {Component} from "@angular/core";
import {slideInAnimation} from "../transition";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../auth.service";
import {ChildrenOutletContexts} from "@angular/router";
import {User} from "../model/User";
import {openCreatePostForm} from "../openCreatePostForm";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [slideInAnimation, trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(200%)'}),
      animate('160ms ease-in-out')
    ]),
    transition('* => void', [
      animate('160ms ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ])],

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

  hasUser() {
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


  protected readonly openCreatePostForm = openCreatePostForm;
}
