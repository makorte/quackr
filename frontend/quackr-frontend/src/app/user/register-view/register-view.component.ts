import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingState} from "../../shared/model/LoadingState";
import {UserService} from "../../shared/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.sass']
})
export class RegisterViewComponent {
  private registerState: LoadingState | null = null;
  private error: string;


  constructor(private router: Router, private userService: UserService) {

  }

  onRegister(username: string, password: string, imageUrl: string) {
    this.registerState = LoadingState.Loading;

    this.userService.register(username, password, imageUrl).subscribe({
      next: () => {
        this.registerState = LoadingState.Loaded;
        this.router.navigate(["login"]);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.error = "Ein Nutzer mit diesem Nutzernamen existiert bereits!"
        }
        console.log(err);
        this.registerState = LoadingState.Error;
      }
    })
  }


  getLoadingColor() {
    switch (this.registerState) {
      case LoadingState.Loading :
        return 'bg-info';
      case LoadingState.Loaded :
        return 'bg-success';
      case LoadingState.Error :
        return 'bg-danger';
    }
    return '';
  }

  isRegisterError(): boolean {
    return !(this.registerState == null || this.registerState == LoadingState.Error);
  }

  isLoading() {
    return this.registerState === LoadingState.Loading;
  }

  getError(): string {
    return this.error;
  }
}
