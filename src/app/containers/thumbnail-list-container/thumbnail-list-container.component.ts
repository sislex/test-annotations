import { Component } from '@angular/core';
import {ThumbnailComponent} from '../../components/thumbnail/thumbnail.component';
import {Store} from "@ngrx/store";
import {getActiveDocumentPages, getActivePage} from "../../+state/document/document.selectors";
import {AsyncPipe} from "@angular/common";
import {setActivePage} from "../../+state/document/document.actions";
import {scrollToElementPage} from "../../helpers/scrollToElement";

@Component({
  selector: 'app-thumbnail-list-container',
  standalone: true,
  imports: [
    ThumbnailComponent,
    AsyncPipe
  ],
  templateUrl: './thumbnail-list-container.component.html',
  styleUrl: './thumbnail-list-container.component.scss'
})
export class ThumbnailListContainerComponent {
  activeDocumentPages$ = this.store.select(getActiveDocumentPages);
  selectedPageNumber$ = this.store.select(getActivePage);

  constructor(
    private store: Store,
  ) {}

  events(event$: any) {
    if (event$.event === 'ThumbnailComponent:OBJECT_CLICKED') {
      const activePageNumber = event$.data.number
      this.store.dispatch(setActivePage({activePageNumber}))
      scrollToElementPage('page-' + activePageNumber.toString());
    }
  }
}
