import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../../core/services/alert.service";
import {BookingManagementService} from "../../booking-management.service";

@Component({
  selector: 'app-delete-booking-modal',
  templateUrl: './delete-booking-modal.component.html',
  styleUrls: ['./delete-booking-modal.component.css']
})
export class DeleteBookingModalComponent {

  @Input() deleteId!: number;
  @Output() isBookingDeletedEvent = new EventEmitter<boolean>();

  constructor(
    public modalService: NgbModal,
    private alertService: AlertService,
    private bookingManagementService: BookingManagementService,
  ) {
  }

  delete(): void {
    this.modalService.dismissAll();
    this.bookingManagementService.deleteBooking(this.deleteId).subscribe(
      () => {
        this.alertService.warn("Booking with id " + this.deleteId + " deleted!", {autoClose: true});
        this.isBookingDeletedEvent.emit(true);
        this.deleteId = -1;
      }
    )
  }

  cancelDelete() {
    this.modalService.dismissAll();
    this.deleteId = -1;
  }
}
