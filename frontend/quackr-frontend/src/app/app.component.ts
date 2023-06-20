import {Component} from "@angular/core";
import {slideInAnimation} from "./transition";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "./shared/service/auth.service";
import {ChildrenOutletContexts} from "@angular/router";

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

  public showSidebar = false;


  constructor(private authService: AuthService, private contexts: ChildrenOutletContexts) {

  }

  showSideBar(): void {
    this.showSidebar = !this.showSidebar;
  }

  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  getRouteAnimationData(): any {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
