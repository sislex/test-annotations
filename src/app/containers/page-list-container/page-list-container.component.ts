import { Component } from '@angular/core';
import {PageContainerComponent} from "../page-container/page-container.component";
import {getActiveDocumentPages} from "../../+state/document/document.selectors";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-page-list-container',
  standalone: true,
  imports: [
    PageContainerComponent,
    AsyncPipe
  ],
  templateUrl: './page-list-container.component.html',
  styleUrl: './page-list-container.component.scss'
})
export class PageListContainerComponent {
  activeDocumentPages$ = this.store.select(getActiveDocumentPages);

  constructor(
    private store: Store,
  ) {}
}
