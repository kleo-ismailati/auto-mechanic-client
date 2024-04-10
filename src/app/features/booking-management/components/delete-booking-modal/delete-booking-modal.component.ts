import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-delete-booking-modal',
  templateUrl: './delete-booking-modal.component.html',
  styleUrls: ['./delete-booking-modal.component.css']
})
export class DeleteBookingModalComponent {

  @Output() deleteBookingConfirmed = new EventEmitter<boolean>();

  delete(): void {
    this.deleteBookingConfirmed.emit(true);
  }

  cancelDelete() {
    this.deleteBookingConfirmed.emit(false);
  }
}
