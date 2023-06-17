import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.sass']
})
export class RegisterViewComponent {
  private router: Router;
  private authService: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  onRegister() {
    this.router.navigate(["app", "posts"]);
  }
}
