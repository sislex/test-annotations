import { Component } from '@angular/core';
import { PageContainerComponent } from "../page-container/page-container.component";
import { getActiveDocumentPages } from "../../+state/document/document.selectors";
import { Store } from "@ngrx/store";
import { AsyncPipe } from "@angular/common";
import { getActiveItem } from '../../helpers/getActiveItem';
import { take } from 'rxjs';
import { setActiveScrollPage } from "../../+state/document/document.actions";
import { scrollToElementPage } from "../../helpers/scrollToElement";

@Component({
  selector: 'app-page-list-container',
  standalone: true,
  imports: [
    PageContainerComponent,
    AsyncPipe
  ],
  templateUrl: './page-list-container.component.html',
  styleUrls: ['./page-list-container.component.scss']
})
export class PageListContainerComponent {
  activeDocumentPages$ = this.store.select(getActiveDocumentPages);
  private scrollTimeout: any;

  constructor(
    private store: Store,
  ) {}

  scroll($event: any) {
    clearTimeout(this.scrollTimeout);

    this.scrollTimeout = setTimeout(() => {
      const activeItem = getActiveItem($event.target);
      this.activeDocumentPages$.pipe(take(1)).subscribe(pages => {
        const activePageNumber = pages[activeItem].number;

        this.store.dispatch(setActiveScrollPage({ activePageNumber }))
        console.log(activePageNumber);
        scrollToElementPage('thumbnail-' + activePageNumber.toString());
      });
    }, 200);
  }
}
