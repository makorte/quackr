import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.sass']
})
export class ImageInputComponent {
  // @Output() @ViewChild("url", {static:true}) url!: HTMLInputElement;
  @Output() url = new EventEmitter<string>();
  urlString: string ="";
  @Output() file = new EventEmitter<File|null>();
   fileToUpload: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  protected readonly console = console;
}
