import {Component, Input} from '@angular/core';
import {IPage} from "../../+state/document/document.reducer";
import {AsyncPipe, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {pageListSize} from "../../+state/view/view.selectors";

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [
    NgStyle,
    AsyncPipe
  ],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss'
})
export class PageContainerComponent {
  @Input() page!: IPage;

  width$ = this.store.select(pageListSize);

  constructor(
    private store: Store,
  ) {
  }
}
