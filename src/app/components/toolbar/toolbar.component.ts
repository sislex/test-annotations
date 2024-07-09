import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
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
  @Input() title: string | null = '';
  @Input() percentInputValue: number | null = 50;
  @Input() totalPages: number | null = 0;
  @Input() activePage: number | null = 0;
  @Input() isEditMode: boolean | null = false;

  @Output() emitter = new EventEmitter();

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
    this.emitter.emit({
      event: 'ToolbarComponent:MENU_ICON_CLICKED',
    });
  }

  inputValue($event: number, note: string) {
    if (note === 'first') {
    this.emitter.emit({
      event: 'ToolbarComponent:FIRST_INPUT_CHANGE',
      data: $event
    });
    } else if (note === 'second') {
      this.emitter.emit({
        event: 'ToolbarComponent:SECOND_INPUT_CHANGE',
        data: $event
      });
    }
  }

  toggleEditMode() {
    this.emitter.emit({
      event: 'ToolbarComponent:TOGGLE_EDIT_MODE',
    });
  }
}
