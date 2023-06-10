import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LikeStatus, Post} from "../../model/Post";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../model/User";

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.sass'],
  animations: [
    trigger("likeChange", [
      state("liked", style({
        backgroundColor: 'aqua'
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
export class LikeButtonComponent {
  @Input() public post: Post = new Post("Lädt...", 0 ,0 , LikeStatus.NONE, new User(-1, [],"","",""));


  @Output() btnClick = new EventEmitter<null>();
  likeChange() {
    console.log("click")
    this.btnClick.emit(null);

  }
}
