import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/service/auth.service";
import {LoadingState} from "../../shared/model/LoadingState";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-log-in-view',
  templateUrl: './log-in-view.component.html',
  styleUrls: ['./log-in-view.component.sass']
})
export class LogInViewComponent {
  private loginState: LoadingState;
  private error: string;

  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }

  onLogIn(username: string, password: string) {
    this.loginState = LoadingState.Loading;

    this.authService.login(username, password).subscribe({
      next: async () => {
        this.loginState = LoadingState.Loaded;
        await this.router.navigate(["posts"]);
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === HttpStatusCode.Forbidden) {
          this.error = "Falsche Anmeldedaten!"
        }
        this.loginState = LoadingState.Error;
        console.error(err);
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

  isLoginIn(): boolean {
    return this.loginState != null;
  }

  getError(): string {
    return this.error;
  }
}
