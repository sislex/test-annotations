import { Component } from '@angular/core';
import {MatDrawerMode,  MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {ConfigurableFocusTrapFactory, FocusTrapFactory} from '@angular/cdk/a11y';

@Component({
  selector: 'app-sidenav-container',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatRadioModule],
  providers: [{provide: FocusTrapFactory, useClass: ConfigurableFocusTrapFactory}],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss'
})
export class SidenavContainerComponent {
  opened = true;
  mode: MatDrawerMode = 'side';
  position: 'start' | 'end' = 'start';
  hasBackdrop = false;
}
