import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {PostsViewComponent} from "../posts-view/posts-view.component";
import {CreatePostFormComponent} from "../create-post-form/create-post-form.component";

const routes: Routes = [
  {path: 'app', component: AppComponent, children: [
      {path: "create-post", component: CreatePostFormComponent},
      {path: "posts", component: PostsViewComponent }
    ]},
  {path: "", redirectTo:"/app/posts", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
