import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../model/User";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit{
  @Output() onClose = new EventEmitter<null>();

  private router: Router;
  private authService: AuthService;
  user: User = new User(-1, "","/assets/placeholder.png");
  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then(user => this.user = user);
  }

  onLogOut() {
    this.authService.logout();
    this.onClose.emit(null);
    // this.router.navigate(["app","login"]);
  }
  isAuth() {
    return this.authService.isAuthenticated();
  }
}
