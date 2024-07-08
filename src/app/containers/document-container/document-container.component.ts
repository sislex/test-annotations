import {Component} from '@angular/core';
import {DocumentLayoutComponent} from '../../layouts/document-layout/document-layout.component';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {SidenavContainerComponent} from '../sidenav-container/sidenav-container.component';
import {Store} from "@ngrx/store";
import {decreasePageListSize, increasePageListSize, toggleIsThumbnailListOpened} from "../../+state/view/view.actions";
import {pageListSize} from "../../+state/view/view.selectors";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document-container',
  standalone: true,
  imports: [
    DocumentLayoutComponent,
    ToolbarComponent,
    SidenavContainerComponent,
    AsyncPipe
  ],
  templateUrl: './document-container.component.html',
  styleUrl: './document-container.component.scss'
})
export class DocumentContainerComponent {

  pageListSize$ = this.store.select(pageListSize);

  constructor(
    private readonly store: Store,
    protected router: Router,
  ) {}

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
