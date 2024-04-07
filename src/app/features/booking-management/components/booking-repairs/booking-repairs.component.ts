import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {Repair} from "../../../../shared/models/repair.model";
import {environment} from "../../../../../environments/environment";
import {ApiService} from "../../../../core/services/api.service";
import {HelperService} from "../../../../core/utilities/helper.service";
import {AlertService} from "../../../../core/services/alert.service";

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

  repairEditId = -1;
  repairDeleteId = -1;

  updatedRepair!: Repair;

  constructor(
    private api: ApiService,
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
    this.api.put(environment.repairs_url + '/' + updatedRepair.id, updatedRepair).subscribe(
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
