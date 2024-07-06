import { Routes } from '@angular/router';
import {DocumentContainerComponent} from '../document-container/document-container.component';

export const routes: Routes = [
  {
    path: 'document/:id',
    component: DocumentContainerComponent,
  },
  {
    path: '**',
    redirectTo: 'document/1',
  },
];
