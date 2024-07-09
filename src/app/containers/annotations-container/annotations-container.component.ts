import {Component, Input} from '@angular/core';
import {AnnotationsComponent} from '../../components/annotations/annotations.component';
import {IPage} from '../../+state/document/document.reducer';

@Component({
  selector: 'app-annotations-container',
  standalone: true,
  imports: [
    AnnotationsComponent
  ],
  templateUrl: './annotations-container.component.html',
  styleUrl: './annotations-container.component.scss'
})
export class AnnotationsContainerComponent {
@Input() page!: IPage;
}
