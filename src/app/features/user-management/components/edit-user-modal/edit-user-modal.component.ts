import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {

  @Output() updateConfirmed = new EventEmitter<boolean>();

  constructor() {
  }

  cancel() {
    this.updateConfirmed.emit(false);
  }

  confirmUpdate() {
    this.updateConfirmed.emit(true);
  }
}
