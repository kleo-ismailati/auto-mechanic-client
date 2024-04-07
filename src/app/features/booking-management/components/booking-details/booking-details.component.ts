import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {Booking} from "../../models/booking.model";
import {HelperService} from "../../../../core/utilities/helper.service";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../../core/services/api.service";
import {AlertService} from "../../../../core/services/alert.service";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  @Input() bookingInfo!: Booking;
  @Input() addingNewRepair!: boolean;
  @Output() hasSubmittedEvent = new EventEmitter<boolean>();
  @Output() isAddingRepairEvent = new EventEmitter<boolean>();

  protected readonly repairStatus = RepairStatus;
  repairStatusKeys: number[] = [];

  isEdit: boolean = false;

  updatedBookingInfo: Booking;

  constructor(
    private api: ApiService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.updatedBookingInfo = {...this.bookingInfo};
    this.repairStatusKeys = this.helperService.getEnumKeysArray(this.repairStatus);
  }

  ngOnInit(): void {
    this.isEdit = false;
    this.updatedBookingInfo = {...this.bookingInfo};
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put(environment.bookings_url + '/' + id, this.updatedBookingInfo).subscribe(
      () => {
        this.alertService.success("Booking was updated successfully!", {autoClose: true});
        this.isEdit = false;
        this.hasSubmittedEvent.emit(true);
      }
    );
  }

  addRepair() {
    this.addingNewRepair = true;
    this.isAddingRepairEvent.emit(true);
  }

  cancel() {
    this.ngOnInit();
  }
}
