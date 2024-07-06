import { Component } from '@angular/core';
import {ThumbnailComponent} from '../../components/thumbnail/thumbnail.component';

@Component({
  selector: 'app-thumbnail-list-container',
  standalone: true,
  imports: [
    ThumbnailComponent
  ],
  templateUrl: './thumbnail-list-container.component.html',
  styleUrl: './thumbnail-list-container.component.scss'
})
export class ThumbnailListContainerComponent {

}
