import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostComponent} from "../post/post.component";
import {RestService} from "../rest.service";
import {PostListComponent} from "../post-list/post-list.component";
import {CreatePostButtonComponent} from "../create-post-button/create-post-button.component";
import {PostsViewComponent} from "../posts-view/posts-view.component";
import {CreatePostFormComponent} from "../create-post-form/create-post-form.component";
import {CreatePostPopupComponent} from "../create-post-popup/create-post-popup.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    CreatePostButtonComponent,
    CreatePostFormComponent,
    PostsViewComponent,
    CreatePostPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
