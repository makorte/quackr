import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {PostComponent} from "./shared/components/post/post.component";
import {CreatePostButtonComponent} from "./shared/components/create-post-button/create-post-button.component";
import {PostsViewComponent} from "./posts-view/posts-view.component";
import {CreatePostPopupComponent} from "./shared/components/create-post-popup/create-post-popup.component";
import {FormsModule} from "@angular/forms";
import {PostDetailViewComponent} from "./post-detail-view/post-detail-view.component";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/service/auth.service";
import {UserViewComponent} from "./user/user-view/user-view.component";
import {LogInViewComponent} from "./user/log-in-view/log-in-view.component";
import {RegisterViewComponent} from "./user/register-view/register-view.component";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {SideMenuButtonComponent} from "./side-menu-button/side-menu-button.component";
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {PostService} from "./shared/service/post.service";
import {UserService} from "./shared/service/user.service";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CreatePostButtonComponent,
    PostsViewComponent,
    CreatePostPopupComponent,
    PostDetailViewComponent,
    LogInViewComponent,
    RegisterViewComponent,
    SideMenuComponent,
    UserViewComponent,
    SideMenuButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AsyncPipe, PostService, UserService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
