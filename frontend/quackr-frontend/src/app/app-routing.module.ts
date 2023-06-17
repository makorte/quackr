import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {PostsViewComponent} from "../posts-view/posts-view.component";
import {PostDetailViewComponent} from "../post-detail-view/post-detail-view.component";
import {UserViewComponent} from "../posts-view/user-view/user-view.component";
import {LogInViewComponent} from "../log-in-view/log-in-view.component";
import {RegisterViewComponent} from "../register-view/register-view.component";

const routes: Routes = [
  {path: 'app', children: [
      {path: "posts", component: PostsViewComponent },
      {path: "post-details/:id", component: PostDetailViewComponent},
      {path: "user/:id", component: UserViewComponent},
      {path: "login", component: LogInViewComponent},
      {path: "register", component: RegisterViewComponent}
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
