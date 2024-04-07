import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../../environments/environment";
import {ApiService} from "../../../../core/services/api.service";
import {AlertService} from "../../../../core/services/alert.service";

@Component({
  selector: 'app-add-repair-modal',
  templateUrl: './add-repair-modal.component.html',
  styleUrls: ['./add-repair-modal.component.css']
})
export class AddRepairModalComponent {

  @Input() bookingId!: number;
  @Output() isAddingRepairEvent = new EventEmitter<boolean>();
  @Output() isRepairAddedEvent = new EventEmitter<boolean>();

  newRepairForm: FormGroup;
  newRepair = {
    repairCost: 0, repairDetails: "", repairType: ""
  }

  constructor(
    private api: ApiService,
    private alertService: AlertService,
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
    this.api.post(environment.add_repair_url + '/' + this.bookingId, this.newRepair).subscribe(
      () => {
        this.alertService.success("New repair was added successfully!", {autoClose: true});

        this.isRepairAddedEvent.emit(true);
        this.isAddingRepairEvent.emit(false);
        this.resetNewRepairForm();
      }
    )
  }

  cancelNewRepair() {
    this.resetNewRepairForm();
    this.isAddingRepairEvent.emit(false);
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
