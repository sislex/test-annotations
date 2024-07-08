import { Component } from '@angular/core';
import {PageContainerComponent} from "../page-container/page-container.component";

@Component({
  selector: 'app-page-list-container',
  standalone: true,
  imports: [
    PageContainerComponent
  ],
  templateUrl: './page-list-container.component.html',
  styleUrl: './page-list-container.component.scss'
})
export class PageListContainerComponent {

}
