import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AnnotationsComponent} from '../../components/annotations/annotations.component';
import {IPage} from '../../+state/document/document.reducer';
import {Store} from "@ngrx/store";
import {getAddAnnotation} from "../../+state/annotation/annotation.selectors";
import {AsyncPipe} from "@angular/common";
import {addAnnotation} from "../../+state/annotation/annotation.actions";
import {editAnnotation} from '../../+state/document/document.actions';

@Component({
  selector: 'app-annotations-container',
  standalone: true,
  imports: [
    AnnotationsComponent,
    AsyncPipe
  ],
  templateUrl: './annotations-container.component.html',
  styleUrl: './annotations-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationsContainerComponent {
@Input() page!: IPage;

  getAddAnnotation$ = this.store.select(getAddAnnotation);

  constructor(
    private store: Store,
  ) {}

  events($event: any){
    if ($event.event === 'AnnotationsComponent:MODIFY_SHAPE') {
      this.store.dispatch(editAnnotation({annotation: $event.data.annotation, pageNumber: $event.data.page}));
      this.store.dispatch(addAnnotation({annotation: null}));
    }
  }
}
