import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LikeStatus, Post} from "../../model/Post";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../model/User";

@Component({
  selector: 'app-dislike-button',
  templateUrl: './dislike-button.component.html',
  styleUrls: ['./dislike-button.component.sass'],
  animations: [
    trigger("likeChange", [
      state("liked", style({
        backgroundColor: 'rgb(250,0,0)'
      })),
      state("none", style({
        backgroundColor: 'white'
      })),
      transition("none => liked", [
        animate("0.25s ease-in-out")
      ]),
      transition("liked => none", [
        animate("0.25s ease-in-out")
      ])
    ])
  ]
})
export class DislikeButtonComponent {
  @Input() public post: Post = new Post("Lädt...", 0 ,0 , LikeStatus.NONE, new User(-1, [],"","",""));

  @Output() btnClick = new EventEmitter<null>();
  likeChange() {
    this.btnClick.emit(null);

  }
}
