import {Component, Input} from '@angular/core';
import {AnnotationsComponent} from '../../components/annotations/annotations.component';
import {IPage} from '../../+state/document/document.reducer';
import {Store} from "@ngrx/store";
import {getAddAnnotation} from "../../+state/annotation/annotation.selectors";
import {AsyncPipe} from "@angular/common";
import {addAnnotation} from "../../+state/annotation/annotation.actions";
import {saveAnnotation} from "../../+state/document/document.actions";

@Component({
  selector: 'app-annotations-container',
  standalone: true,
  imports: [
    AnnotationsComponent,
    AsyncPipe
  ],
  templateUrl: './annotations-container.component.html',
  styleUrl: './annotations-container.component.scss'
})
export class AnnotationsContainerComponent {
@Input() page!: IPage;

  getAddAnnotation$ = this.store.select(getAddAnnotation);

  constructor(
    private store: Store,
  ) {}

  events($event: any){
    this.store.dispatch(saveAnnotation({annotation: { type: $event.data.type, settings: $event.data.settings }, pageNumber: $event.page}));
    console.log('Пришли значения', $event.data);
    this.store.dispatch(addAnnotation({annotation: null}));
  }
}
