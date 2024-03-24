import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {AlertService} from "../../../../core/services/alert.service";
import {RepairBookingGuestView} from "../../../repair-booking-management/models/repair-booking-guest-view.model";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  data: RepairBookingGuestView | undefined;
  refID: String = '';
  repairStatus = RepairStatus;
  refIDWarning: boolean = false;

  constructor(
    private api: ApiService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.refIDWarning = false;
  }

  viewBooking() {
    if (this.refID && this.refID.length >= 30) {
      this.refIDWarning = false;
      this.api.get('/api/repair_booking/view/' + this.refID).subscribe(
        (data: RepairBookingGuestView) => {
          this.data = data;
          this.alertService.success("Repair Booking found", {autoClose: true});
        }, (error) => {
          if (error.status == "NOT_FOUND") {
            this.alertService.error("Repair Booking not found", {autoClose: true});
          }
        }
      );
    } else {
      this.refIDWarning = true;
    }
  }

}
