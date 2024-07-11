import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-viewer-page-container',
  standalone: true,
  imports: [
  ],
  templateUrl: './viewer-page-container.component.html',
  styleUrl: './viewer-page-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerPageContainerComponent {

}
