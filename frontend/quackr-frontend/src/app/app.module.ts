import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {PostComponent} from "./shared/components/post/post.component";
import {RestService} from "./shared/service/rest.service";
import {PostListComponent} from "./posts-view/post-list/post-list.component";
import {CreatePostButtonComponent} from "./shared/components/create-post-button/create-post-button.component";
import {PostsViewComponent} from "./posts-view/posts-view.component";
import {CreatePostPopupComponent} from "./shared/components/create-post-popup/create-post-popup.component";
import {FormsModule} from "@angular/forms";
import {PostDetailViewComponent} from "./post-detail-view/post-detail-view.component";
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/service/auth.service";
import {UserViewComponent} from "./user-view/user-view.component";
import {UserPostListComponent} from "./user-view/user-post-list/user-post-list.component";
import {PostThreadListComponent} from "./post-detail-view/post-thread-list/post-thread-list.component";
import {LogInViewComponent} from "./log-in-view/log-in-view.component";
import {RegisterViewComponent} from "./register-view/register-view.component";
import {ImageInputComponent} from "./shared/components/image-input/image-input.component";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {SideMenuButtonComponent} from "./side-menu-button/side-menu-button.component";
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    CreatePostButtonComponent,
    PostsViewComponent,
    CreatePostPopupComponent,
    PostDetailViewComponent,
    PostThreadListComponent,
    LogInViewComponent,
    RegisterViewComponent,
    ImageInputComponent,
    SideMenuComponent,
    UserViewComponent,
    UserPostListComponent,
    SideMenuButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule
  ],
  providers: [RestService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
