import {Component, ViewChild} from '@angular/core';
import {DocumentLayoutComponent} from '../../layouts/document-layout/document-layout.component';
import {ToolbarComponent} from '../../components/toolbar/toolbar.component';
import {SidenavContainerComponent} from '../sidenav-container/sidenav-container.component';

@Component({
  selector: 'app-document-container',
  standalone: true,
  imports: [
    DocumentLayoutComponent,
    ToolbarComponent,
    SidenavContainerComponent
  ],
  templateUrl: './document-container.component.html',
  styleUrl: './document-container.component.scss'
})
export class DocumentContainerComponent {
  @ViewChild('sidenav') sidenav!: SidenavContainerComponent;

  onToggleSidenav() {
    this.sidenav.toggle();
  }
}
