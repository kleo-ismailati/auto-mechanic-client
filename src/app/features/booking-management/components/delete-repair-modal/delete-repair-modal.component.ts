import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {AlertService} from "../../../../core/services/alert.service";
import {ApiService} from "../../../../core/services/api.service";

@Component({
  selector: 'app-delete-repair-modal',
  templateUrl: './delete-repair-modal.component.html',
  styleUrls: ['./delete-repair-modal.component.css']
})
export class DeleteRepairModalComponent {

  @Input() repairId!: number;
  @Output() isRepairDeletedEvent = new EventEmitter<boolean>();

  constructor(
    private api: ApiService,
    private alertService: AlertService,
  ) {
  }

  deleteRepair() {
    this.api.delete(environment.repairs_url + '/' + this.repairId).subscribe(
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
