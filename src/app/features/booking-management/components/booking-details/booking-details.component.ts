import {Component, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {ApiService} from "../../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {HelperService} from "../../../../core/utilities/helper.service";
import {Repair} from "../../../../shared/models/repair.model";
import {AlertService} from "../../../../core/services/alert.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/bookings",
      label: "Bookings",
    }
  ];
  data!: Booking;
  newRepairForm: FormGroup;
  newRepair = {
    repairCost: 0, repairDetails: "", repairType: ""
  }
  repairStatus = RepairStatus;
  repairStatusKeys: number[] = [];

  isEdit: boolean = false;
  addingNewRepair: boolean = false;
  repairEditId = -1;
  repairDeleteId = -1;

  constructor(
    private api: ApiService,
    private helperService: HelperService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {

    this.isEdit = false;
    this.addingNewRepair = false;
    this.repairEditId = -1;
    this.repairDeleteId = -1;
    this.repairStatusKeys = this.helperService.getEnumKeysArray(this.repairStatus);

    this.newRepairForm.reset(
      {
        repairCost: 0
      }
    );

    this.newRepair = {
      repairCost: 0,
      repairDetails: "",
      repairType: ""
    }

    let id = this.route.snapshot.paramMap.get('id');
    this.api.get(environment.bookings_url + '/' + id).subscribe(
      (data: Booking) => {
        this.data = data;
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newRepairForm.controls;
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
    let data: Booking = {
      status: Number(this.data.status)
    };
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put(environment.bookings_url + '/' + id, data).subscribe(
      () => {
        this.alertService.success("Booking was updated successfully!", {autoClose: true});
        this.ngOnInit();
      }
    );
  }

  enableRepairEdit(repair: Repair) {
    if (this.repairEditId == -1) {
      this.repairEditId = repair.id;
    }
  }

  submitRepair(repair: Repair) {
    let repairPayload: Repair = {
      id: repair.id,
      repairCost: repair.repairCost,
      repairDetails: repair.repairDetails,
      repairStatus: repair.repairStatus,
      repairType: repair.repairType
    }
    this.api.put(environment.repairs_url + '/' + repair.id, repairPayload).subscribe(
      () => {
        this.alertService.success("Repair was updated successfully!", {autoClose: true});
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.ngOnInit();
      }
    )
  }

  submitNewRepair() {
    this.newRepair = {
      repairType: this.newRepairForm.value['repairType'],
      repairDetails: this.newRepairForm.value['repairDetails'],
      repairCost: this.newRepairForm.value['repairCost']
    }
    this.api.post(environment.add_repair_url + '/' + this.data.id, this.newRepair).subscribe(
      () => {
        this.alertService.success("New repair was added successfully!", {autoClose: true});
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.ngOnInit();
      }
    )
  }

  cancelNewRepair() {
    this.newRepair = {
      repairCost: 0,
      repairDetails: "",
      repairType: ""
    }
    this.addingNewRepair = false;
  }

  addRepair() {
    this.addingNewRepair = true;
  }

  isRepairEdit(id: number): boolean {
    return id == this.repairEditId;
  }

  deleteRepair() {
    this.modalService.dismissAll();
    this.api.delete(environment.repairs_url + '/' + this.repairDeleteId).subscribe(
      () => {
        this.alertService.warn("Repair with id " + this.repairDeleteId + " was deleted!", {autoClose: true});
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.ngOnInit();
      }
    )
  }

  cancel() {
    this.ngOnInit();
  }

  confirmDeleteRepair(id: number) {
    this.repairDeleteId = id;
  }

  cancelDeleteRepair() {
    this.modalService.dismissAll();
    this.repairDeleteId = -1;
  }
}
