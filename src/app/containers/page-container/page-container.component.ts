import {Component, Input} from '@angular/core';
import {IPage} from "../../+state/document/document.reducer";

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [
  ],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss'
})
export class PageContainerComponent {
  @Input() page!: IPage;
}
