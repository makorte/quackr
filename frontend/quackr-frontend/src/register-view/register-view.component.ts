import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {LoadingState} from "../model/LoadingState";

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.sass']
})
export class RegisterViewComponent {
  private router: Router;
  private authService: AuthService;
  registerState: LoadingState|null = null;


  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  onRegister() {
    this.registerState = LoadingState.Loading;
    this.authService.register()
      .then(erfolgreich => {
        if (erfolgreich) {
          this.registerState = LoadingState.Loaded;
          this.router.navigate(["app", "posts"]);
        }else {
          this.registerState = LoadingState.Error;
        }
      })
  }

  protected readonly LoadingState = LoadingState;

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
}
