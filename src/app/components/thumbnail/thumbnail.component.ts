import {Component, Input} from '@angular/core';
import {IPage} from "../../+state/document/document.reducer";

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss'
})
export class ThumbnailComponent {
  @Input() page!: IPage;
}
