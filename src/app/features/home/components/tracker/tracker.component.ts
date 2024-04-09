import {Component, OnInit} from '@angular/core';
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {AlertService} from "../../../../core/services/alert.service";
import {BookingSummary} from "../../../booking-management/models/booking-summary.model";
import {HomeService} from "../../home.service";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  data: BookingSummary | undefined;
  referenceId: string = '';
  repairStatus = RepairStatus;

  constructor(
    private homeService: HomeService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.referenceId = '';
  }

  viewBooking() {
    if (this.referenceId && this.referenceId.length >= 30) {
      this.homeService.getBookingSummary(this.referenceId).subscribe(
        {
          next: ((data: BookingSummary) => {
            this.data = data;
            this.alertService.success("Booking found!", {autoClose: true});
          }),
          error: ((error) => {
            if (error.status == "NOT_FOUND") {
              this.alertService.error("Booking could not be found!", {autoClose: true});
            }
          })
        }
      );
      this.ngOnInit();
    }
  }

}
