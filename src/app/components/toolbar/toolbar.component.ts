import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {pageListSize} from "../../+state/view/view.selectors";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() emitter = new EventEmitter();
  @Input() percentInputValue: number | null = 50;

  firstInputValue: number = 1;
  stateString: number = 2;
  documentName: string = 'doc.pdf';

  increment() {
    this.emitter.emit({
      event: 'ToolbarComponent:INCREMENT_CLICKED',
    });
  }

  decrement() {
    this.emitter.emit({
      event: 'ToolbarComponent:DECREMENT_CLICKED',
    });
  }

  toggleSidenav() {

  }
}
