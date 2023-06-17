import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../auth.service";
import {User} from "../model/User";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['./side-menu-button.component.sass']
})
export class SideMenuButtonComponent implements OnInit{

  @Output() showSideBar = new EventEmitter<null>();
  private authService: AuthService;

   user: User = new User(-1, [], "","/assets/placeholder.png", "");

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch(error => {
        console.error(error)
        setTimeout(this.ngOnInit, 1000);
      })

  }

}
