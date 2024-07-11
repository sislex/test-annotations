import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IPage} from "../../+state/document/document.reducer";
import {AsyncPipe, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {getIsEditMode, pageListSize} from "../../+state/view/view.selectors";
import {AnnotationsContainerComponent} from '../annotations-container/annotations-container.component';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [
    NgStyle,
    AsyncPipe,
    AnnotationsContainerComponent
  ],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainerComponent {
  @Input() page!: IPage;

  width$ = this.store.select(pageListSize);
  getIsEditMode$ = this.store.select(getIsEditMode);

  constructor(
    private store: Store,
  ) {
  }
}
