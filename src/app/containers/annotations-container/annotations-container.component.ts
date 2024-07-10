import {Component, Input} from '@angular/core';
import {AnnotationsComponent} from '../../components/annotations/annotations.component';
import {IPage} from '../../+state/document/document.reducer';
import {Store} from "@ngrx/store";
import {getAddAnnotation} from "../../+state/annotation/annotation.selectors";
import {AsyncPipe} from "@angular/common";

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
}
