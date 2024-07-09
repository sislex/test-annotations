import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPage} from "../../+state/document/document.reducer";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss'
})
export class ThumbnailComponent {
  @Input() page!: IPage;
  @Input() selectedPageNumber: number | null = 1;
  @Output() emitter = new EventEmitter();

  objectSelected(number: number) {
    this.emitter.emit({
      event: 'ThumbnailComponent:OBJECT_CLICKED',
      data: {number}
    });
  }
}
