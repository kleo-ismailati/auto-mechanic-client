import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-delete-repair-modal',
  templateUrl: './delete-repair-modal.component.html',
  styleUrls: ['./delete-repair-modal.component.css']
})
export class DeleteRepairModalComponent {

  @Output() confirmRepairDelete = new EventEmitter<boolean>();

  deleteRepair() {
    this.confirmRepairDelete.emit(true);
  }

  cancelDeleteRepair() {
    this.confirmRepairDelete.emit(false);
  }
}
