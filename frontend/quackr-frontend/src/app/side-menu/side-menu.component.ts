import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/user";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {
  @Output() onClose = new EventEmitter<null>();

  private router: Router;
  private authService: AuthService;
  user: User = new User("", "/assets/placeholder.png");

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
