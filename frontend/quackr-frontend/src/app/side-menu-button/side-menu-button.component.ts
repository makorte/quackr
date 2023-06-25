import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/user.model";

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['./side-menu-button.component.sass']
})
export class SideMenuButtonComponent implements OnInit {

  @Output() private showSideBar = new EventEmitter<null>();
  private user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: user => this.user = user
    })
  }

  handleShowSidebarClick() {
    this.showSideBar.emit(null)
  }

  getImageUrl(): string {
    if(!this.user.imageUrl) {
      return "/assets/placeholder.png"
    } else {
      return this.user.imageUrl;
    }
  }
}
