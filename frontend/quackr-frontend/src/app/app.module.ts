import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostComponent} from "../post/post.component";
import {RestService} from "../rest.service";
import {PostListComponent} from "../post-list/post-list.component";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
