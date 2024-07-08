import { Component } from '@angular/core';
import {ThumbnailComponent} from '../../components/thumbnail/thumbnail.component';
import {Store} from "@ngrx/store";
import {getActiveDocumentPages} from "../../+state/document/document.selectors";
import {AsyncPipe} from "@angular/common";

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

  constructor(
    private store: Store,
  ) {}
}
