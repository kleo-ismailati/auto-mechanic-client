import {Component, OnInit} from '@angular/core';
import {RepairBooking} from "../../../core/models/repair-booking.model";
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {RepairStatus} from "../../../core/models/repair-status-enum";
import {HelperService} from "../../../core/services/helper.service";
import {Repair} from "../../../core/models/repair.model";

@Component({
  selector: 'app-repair-booking-list-details',
  templateUrl: './repair-booking-details.component.html',
  styleUrls: ['./repair-booking-details.component.css']
})
export class RepairBookingDetailsComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/repair-booking-list",
      label: "Bookings",
    }
  ];

  data: RepairBooking = {status: RepairStatus["To Be Done"]};
  repairStatus = RepairStatus;
  repairStatusKeys: number[] = this.helperService.getEnumKeysArray(this.repairStatus);
  isEdit: boolean = false;
  addingNewRepair: boolean = false;
  newRepair = {
    repairCost: 0, repairDetails: "", repairType: ""
  }
  private repairEditId = -1;

  constructor(
    private api: ApiService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get('/api/repair_booking/' + id).subscribe(
      (data:RepairBooking) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
    let data : RepairBooking = {
      status : Number(this.data.status)
    };
    console.log(this.data?.status);
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put('/api/repair_booking/' + id, data).subscribe(
      () => {
        this.isEdit = false;
        this.ngOnInit();
      }
    );
  }

  enableRepairEdit(id: number) {
    if(this.repairEditId == -1){
      this.repairEditId = id;
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
    this.api.put('/api/repair/'+ repair.id, repairPayload).subscribe(
      ()=> {
        this.repairEditId = -1;
        this.ngOnInit();
      }
    )
  }
  submitNewRepair(){
    this.api.post('/api/repair/add/' + this.data.id, this.newRepair).subscribe(
      () => {
        this.addingNewRepair = false;
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

  addRepair(){
    this.addingNewRepair = true;
  }

  isRepairEdit(id: number) {
    return id == this.repairEditId;
  }

  deleteRepair(id: number) {
    this.api.delete('/api/repair/'+ id).subscribe(
      ()=> {
        this.ngOnInit();
      }
    )
  }
}
