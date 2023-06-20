import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {LoadingState} from "../shared/model/LoadingState";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.sass']
})
export class RegisterViewComponent {
  private registerState: LoadingState | null = null;


  constructor(private router: Router,private authService: AuthService) {

  }

  onRegister() {
    this.registerState = LoadingState.Loading;
    this.authService.register()
      .then(erfolgreich => {
        if (erfolgreich) {
          this.registerState = LoadingState.Loaded;
          this.router.navigate(["app", "posts"]);
        } else {
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
    return this.registerState != null;
  }
}
