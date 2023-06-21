import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.sass']
})
export class ImageInputComponent {
  // @Output() @ViewChild("url", {static:true}) url!: HTMLInputElement;
  @Output() url = new EventEmitter<string>();
  urlString: string = "";

  protected readonly console = console;
}
