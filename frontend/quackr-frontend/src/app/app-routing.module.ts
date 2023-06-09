import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {PostsViewComponent} from "../posts-view/posts-view.component";

const routes: Routes = [
  {path: 'app', component: AppComponent, children: [
      {path: "posts", component: PostsViewComponent }
    ]},
  {path: "", redirectTo:"/app/posts", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
