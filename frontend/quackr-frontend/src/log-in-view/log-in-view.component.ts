import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-log-in-view',
  templateUrl: './log-in-view.component.html',
  styleUrls: ['./log-in-view.component.sass']
})
export class LogInViewComponent {
  private router: Router;
  private authService: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  onLogIn() {
    this.router.navigate(["app", "posts"]);
  }
}
