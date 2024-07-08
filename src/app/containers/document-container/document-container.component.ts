import {Component, OnInit} from '@angular/core';
import {DocumentLayoutComponent} from '../../layouts/document-layout/document-layout.component';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {SidenavContainerComponent} from '../sidenav-container/sidenav-container.component';
import {Store} from "@ngrx/store";
import {decreasePageListSize, increasePageListSize, toggleIsThumbnailListOpened} from "../../+state/view/view.actions";
import {pageListSize} from "../../+state/view/view.selectors";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from '@angular/router';
import {loadDocument} from "../../+state/document/document.actions";
import {getActiveDocumentName} from "../../+state/document/document.selectors";

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

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
  }

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
    }
  }
}
