import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {LoadingState} from "../model/LoadingState";

@Component({
  selector: 'app-log-in-view',
  templateUrl: './log-in-view.component.html',
  styleUrls: ['./log-in-view.component.sass']
})
export class LogInViewComponent {
  private router: Router;
  private authService: AuthService;
   loginState: LoadingState|null = null;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  onLogIn() {
    this.loginState = LoadingState.Loading;
    this.authService.login()
      .then(erfolgreich => {
        if (erfolgreich) {
          this.loginState = LoadingState.Loaded;
          this.router.navigate(["app", "posts"]);
          console.log("login")
        } else {
          this.loginState = LoadingState.Error;
        }
      })
  }

  getLoadingColor() {
    switch (this.loginState) {
      case LoadingState.Loading :
        return 'bg-info';
      case LoadingState.Loaded :
        return 'bg-success';
      case LoadingState.Error :
        return 'bg-danger';
    }
    return '';
  }

  protected readonly LoadingState = LoadingState;
}
