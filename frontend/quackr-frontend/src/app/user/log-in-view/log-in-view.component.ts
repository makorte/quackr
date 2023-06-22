import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";
import {LoadingState} from "../../shared/model/LoadingState";

@Component({
  selector: 'app-log-in-view',
  templateUrl: './log-in-view.component.html',
  styleUrls: ['./log-in-view.component.sass']
})
export class LogInViewComponent {
  private loginState: LoadingState | null = null;

  constructor(private router: Router, private authService: AuthService) {
  }

  onLogIn(username: string, password: string) {
    this.loginState = LoadingState.Loading;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.loginState = LoadingState.Loaded;
        this.router.navigate(["posts"]);
        console.log("login success")
      },
      error: (err) => {
        this.loginState = LoadingState.Error;
        console.log(err);
      }
    })

    /*
    this.authService.login()
      .then(successful => {
        if (successful) {
          this.loginState = LoadingState.Loaded;
          this.router.navigate(["app", "posts"]);
        } else {
          this.loginState = LoadingState.Error;
        }
      })
     */
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

  hasLoginError(): boolean {
    return !(this.loginState == null || this.loginState == LoadingState.Error);
  }

  isLoginIn(): boolean {
    return this.loginState != null;
  }
}
