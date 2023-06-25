import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingState} from "../../shared/model/LoadingState";
import {UserService} from "../../shared/service/user.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.sass']
})
export class RegisterViewComponent {
  private registerState: LoadingState;
  private error: string;


  constructor(private readonly router: Router, private readonly userService: UserService) {

  }

  onRegister(username: string, password: string, imageUrl: string) {
    this.registerState = LoadingState.Loading;

    this.userService.register(username, password, imageUrl).subscribe({
      next: async () => {
        this.registerState = LoadingState.Loaded;
        await this.router.navigate(["login"]);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.BadRequest) {
          this.error = "Ein Nutzer mit diesem Nutzernamen existiert bereits!"
        }
        console.error(err);
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
