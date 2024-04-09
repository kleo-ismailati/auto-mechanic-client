import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {Repair} from "../../../../shared/models/repair.model";
import {HelperService} from "../../../../core/utilities/helper.service";
import {AlertService} from "../../../../core/services/alert.service";
import {BookingManagementService} from "../../booking-management.service";

@Component({
  selector: 'app-booking-repairs',
  templateUrl: './booking-repairs.component.html',
  styleUrls: ['./booking-repairs.component.css']
})
export class BookingRepairsComponent implements OnInit {

  @Input() repairs!: Repair[];
  @Output() repairToBeDeletedEvent = new EventEmitter<number>();
  @Output() repairUpdatedEvent = new EventEmitter<boolean>();

  protected readonly repairStatus = RepairStatus;
  repairStatusKeys: number[] = [];

  repairEditId: number = -1;
  repairDeleteId: number = -1;

  updatedRepair!: Repair;

  constructor(
    private bookingManagementService: BookingManagementService,
    private helperService: HelperService,
    private alertService: AlertService
  ) {
    this.repairStatusKeys = this.helperService.getEnumKeysArray(this.repairStatus);
  }

  ngOnInit(): void {
    this.repairEditId = -1;
  }

  enableRepairEdit(repair: Repair) {
    if (this.repairEditId == -1) {
      this.repairEditId = repair.id;
      this.updatedRepair = {...repair};
    }
  }

  isRepairEdit(id: number): boolean {
    return id == this.repairEditId;
  }

  cancel() {
    this.ngOnInit();
  }

  confirmDeleteRepair(id: number) {
    this.repairDeleteId = id;
    this.repairToBeDeletedEvent.emit(id);
  }

  submitRepair(updatedRepair: Repair) {
    this.bookingManagementService.postUpdatedRepair(updatedRepair.id, updatedRepair).subscribe(
      () => {
        this.alertService.success("Repair was updated successfully!", {autoClose: true});
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.repairUpdatedEvent.emit(true);
        this.ngOnInit();
      }
    )
  }

}
