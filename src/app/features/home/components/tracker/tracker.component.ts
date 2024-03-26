import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {AlertService} from "../../../../core/services/alert.service";
import {BookingSummary} from "../../../booking-management/models/booking-summary.model";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  data: BookingSummary | undefined;
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
      this.api.get('/api/bookings/view/' + this.refID).subscribe(
        {
          next: ((data: BookingSummary) => {
            this.data = data;
            this.alertService.success("Booking found", {autoClose: true});
          }),
          error: ((error) => {
            if (error.status == "NOT_FOUND") {
              this.alertService.error("Booking not found", {autoClose: true});
            }
          })
        }
      );
    } else {
      this.refIDWarning = true;
    }
  }

}
