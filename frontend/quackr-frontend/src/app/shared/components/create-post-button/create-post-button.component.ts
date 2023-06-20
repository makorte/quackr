import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-post-button',
  templateUrl: './create-post-button.component.html',
  styleUrls: ['./create-post-button.component.sass']
})
export class CreatePostButtonComponent {
  @Output() private createPost = new EventEmitter<null>();

  onClickCreate():void {
    this.createPost.emit(null);
  }
}
