import {Component, OnInit} from '@angular/core';
import {DocumentLayoutComponent} from '../../layouts/document-layout/document-layout.component';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {SidenavContainerComponent} from '../sidenav-container/sidenav-container.component';
import {Store} from "@ngrx/store";
import {
  decreasePageListSize,
  increasePageListSize,
  setSizePage,
  toggleIsThumbnailListOpened
} from "../../+state/view/view.actions";
import {pageListSize} from "../../+state/view/view.selectors";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from '@angular/router';
import {loadDocument, setActivePage} from "../../+state/document/document.actions";
import {getActiveDocumentName, getActivePage, getTotalPages} from "../../+state/document/document.selectors";
import {scrollToElement} from "../../helpers/scrollToElement";

@Component({
  selector: 'app-document-container',
  standalone: true,
  imports: [
    DocumentLayoutComponent,
    ToolbarComponent,
    SidenavContainerComponent,
    AsyncPipe,
  ],
  templateUrl: './document-container.component.html',
  styleUrl: './document-container.component.scss'
})
export class DocumentContainerComponent implements OnInit {

  activeDocumentName$ = this.store.select(getActiveDocumentName);
  pageListSize$ = this.store.select(pageListSize);
  totalPages$ = this.store.select(getTotalPages);
  activePage$ = this.store.select(getActivePage);

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(loadDocument({ id }));
      }
    });
  }

  events($event: any) {
    if ($event.event === 'ToolbarComponent:MENU_ICON_CLICKED') {
      this.store.dispatch(toggleIsThumbnailListOpened())
    } else if ($event.event === 'ToolbarComponent:INCREMENT_CLICKED') {
      this.store.dispatch(increasePageListSize())
    } else if ($event.event === 'ToolbarComponent:DECREMENT_CLICKED') {
      this.store.dispatch(decreasePageListSize())
    } else if ($event.event === 'ToolbarComponent:FIRST_INPUT_CHANGE') {
      const parsedValue = Number.parseInt($event.data, 10); // Преобразуем $event.data в число
      if (!isNaN(parsedValue)) {
        this.store.dispatch(setActivePage({activePageNumber: parsedValue}));
        scrollToElement('page-' + parsedValue.toString());
      }
    }
    else if ($event.event === 'ToolbarComponent:SECOND_INPUT_CHANGE') {
      const parsedValue = Number.parseInt($event.data, 10); // Преобразуем $event.data в число
      if (!isNaN(parsedValue)) {
        this.store.dispatch(setSizePage({ pageSize: parsedValue }));
      }
    }
  }


}
