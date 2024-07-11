import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {ConfigurableFocusTrapFactory, FocusTrapFactory} from '@angular/cdk/a11y';
import {ThumbnailListContainerComponent} from '../thumbnail-list-container/thumbnail-list-container.component';
import {ViewerPageContainerComponent} from "../viewer-page-container/viewer-page-container.component";
import {Store} from "@ngrx/store";
import {isThumbnailListOpened} from "../../+state/view/view.selectors";
import {AsyncPipe} from "@angular/common";
import {PageListContainerComponent} from "../page-list-container/page-list-container.component";

@Component({
  selector: 'app-sidenav-container',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatRadioModule, ThumbnailListContainerComponent, ViewerPageContainerComponent, AsyncPipe, PageListContainerComponent],
  providers: [{provide: FocusTrapFactory, useClass: ConfigurableFocusTrapFactory}],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavContainerComponent {
  isThumbnailListOpened$ = this.store$.select(isThumbnailListOpened);

  mode: MatDrawerMode = 'side';
  position: 'start' | 'end' = 'start';
  hasBackdrop = false;

  constructor(
    private store$: Store) {
  }

}
