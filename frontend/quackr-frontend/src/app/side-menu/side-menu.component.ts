import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/user.model";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {
  @Output() onClose = new EventEmitter<null>();
  private user: User;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly asyncPipe: AsyncPipe
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: user => this.user = user
    })
  }

  onLogOut(): void {
    this.authService.logout();
    this.onClose.emit(null);
  }

  isAuth(): boolean {
    return !!this.asyncPipe.transform(this.authService.currentUser$);
  }

  getUser(): User {
    return this.user;
  }
}
