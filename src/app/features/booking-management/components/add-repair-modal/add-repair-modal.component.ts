import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RepairCreate} from "../../../../shared/models/repair.model";

@Component({
  selector: 'app-add-repair-modal',
  templateUrl: './add-repair-modal.component.html',
  styleUrls: ['./add-repair-modal.component.css']
})
export class AddRepairModalComponent {

  @Output() addRepair = new EventEmitter<RepairCreate | null>();

  newRepairForm: FormGroup;
  newRepair: RepairCreate = {
    repairCost: 0, repairDetails: "", repairType: ""
  }

  constructor(
    private formBuilder: FormBuilder,
    public modalService: NgbModal
  ) {
    this.newRepairForm = this.formBuilder.group({
      repairType: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      repairCost: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(99999)
      ]),
      repairDetails: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newRepairForm.controls;
  }

  submitNewRepair() {
    this.newRepair = {
      repairType: this.newRepairForm.value['repairType'],
      repairDetails: this.newRepairForm.value['repairDetails'],
      repairCost: this.newRepairForm.value['repairCost']
    }
    this.addRepair.emit(this.newRepair);
  }

  cancelNewRepair() {
    this.resetNewRepairForm();
    this.addRepair.emit(null);
  }

  resetNewRepairForm() {
    this.newRepair = {
      repairCost: 0,
      repairDetails: "",
      repairType: ""
    }

    this.newRepairForm.reset(
      this.newRepair
    );
  }
}
