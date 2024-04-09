import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertService} from "../../../../core/services/alert.service";
import {BookingManagementService} from "../../booking-management.service";

@Component({
  selector: 'app-delete-repair-modal',
  templateUrl: './delete-repair-modal.component.html',
  styleUrls: ['./delete-repair-modal.component.css']
})
export class DeleteRepairModalComponent {

  @Input() repairId!: number;
  @Output() isRepairDeletedEvent = new EventEmitter<boolean>();

  constructor(
    private bookingManagementService: BookingManagementService,
    private alertService: AlertService,
  ) {
  }

  deleteRepair() {
    this.bookingManagementService.deleteRepair(this.repairId).subscribe(
      () => {
        this.alertService.warn("Repair with id " + this.repairId + " was deleted!", {autoClose: true});
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.isRepairDeletedEvent.emit(true);
      }
    )
  }

  cancelDeleteRepair() {
    this.isRepairDeletedEvent.emit(false);
    this.repairId = -1;
  }
}
