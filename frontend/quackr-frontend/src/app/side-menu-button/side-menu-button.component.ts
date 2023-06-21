import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/user";

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['./side-menu-button.component.sass']
})
export class SideMenuButtonComponent implements OnInit {

  @Output() private showSideBar = new EventEmitter<null>();

  private user: User = new User("", "/assets/placeholder.png");

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch(error => {
        console.error(error)
      })

  }

  getUser(): User {
    return this.user;
  }

  handleShowSidebarClick() {
    this.showSideBar.emit(null)
  }
}
