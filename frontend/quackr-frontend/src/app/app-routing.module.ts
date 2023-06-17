import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {PostsViewComponent} from "../posts-view/posts-view.component";
import {PostDetailViewComponent} from "../post-detail-view/post-detail-view.component";
import {UserViewComponent} from "../posts-view/user-view/user-view.component";
import {LogInViewComponent} from "../log-in-view/log-in-view.component";
import {RegisterViewComponent} from "../register-view/register-view.component";
import {animation} from "@angular/animations";

const routes: Routes = [
  {path: 'app', children: [
      {path: "posts", component: PostsViewComponent , data: {animation: 'Posts'}},
      {path: "post-details/:id", component: PostDetailViewComponent, data: {animation: 'PostDetail'}},
      {path: "user/:id", component: UserViewComponent, data: {animation: 'User'}},
      {path: "login", component: LogInViewComponent, data: {animation: 'LogIn'}},
      {path: "register", component: RegisterViewComponent, data: {animation: 'Register'}}
    ]},
  {path: "", redirectTo:"/app/posts", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64]})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
