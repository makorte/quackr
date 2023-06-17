import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostComponent} from "../post/post.component";
import {RestService} from "../rest.service";
import {PostListComponent} from "../post-list/post-list.component";
import {CreatePostButtonComponent} from "../create-post-button/create-post-button.component";
import {PostsViewComponent} from "../posts-view/posts-view.component";
import {CreatePostPopupComponent} from "../create-post-popup/create-post-popup.component";
import {FormsModule} from "@angular/forms";
import {PostDetailViewComponent} from "../post-detail-view/post-detail-view.component";
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LikeButtonComponent} from "../post/like-button/like-button.component";
import {DislikeButtonComponent} from "../post/dislike-button/dislike-button.component";
import {AuthService} from "../auth.service";
import {UserViewComponent} from "../posts-view/user-view/user-view.component";
import {UserPostListComponent} from "../posts-view/user-view/user-post-list/user-post-list.component";
import {PostThreadListComponent} from "../post-detail-view/post-thread-list/post-thread-list.component";
import {UserMenuComponent} from "../user-menu/user-menu.component";
import {LogInViewComponent} from "../log-in-view/log-in-view.component";
import {RegisterViewComponent} from "../register-view/register-view.component";
import {ImageInputComponent} from "../image-input/image-input.component";
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {SideMenuButtonComponent} from "../side-menu-button/side-menu-button.component";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    CreatePostButtonComponent,
    PostsViewComponent,
    CreatePostPopupComponent,
    PostDetailViewComponent,
    LikeButtonComponent,
    DislikeButtonComponent,
    PostThreadListComponent,
    LogInViewComponent,
    RegisterViewComponent,
    ImageInputComponent,
    SideMenuComponent,
    UserViewComponent,
    UserPostListComponent,
    UserMenuComponent,
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
export class AppModule {}
