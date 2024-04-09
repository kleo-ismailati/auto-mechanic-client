import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookingSummary} from "../../../booking-management/models/booking-summary.model";
import {HomeService} from "../../home.service";
import {AlertService} from "../../../../core/services/alert.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-search-reference',
  templateUrl: './search-reference.component.html',
  styleUrls: ['./search-reference.component.css']
})
export class SearchReferenceComponent implements OnInit {

  @Output() getBookingSummaryEvent = new EventEmitter<BookingSummary>();

  bookingSummary: BookingSummary | undefined;
  referenceId: string = '';

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
            this.bookingSummary = data;
            this.alertService.success("Booking found!", {autoClose: true});
            this.getBookingSummaryEvent.emit(this.bookingSummary);
          }),
          error: ((error: HttpErrorResponse) => {
            if (error.status == HttpStatusCode.NotFound) {
              this.bookingSummary = undefined;
              this.alertService.error("Booking could not be found!", {autoClose: true});
              this.getBookingSummaryEvent.emit(this.bookingSummary);
            }
          })
        }
      );
      this.ngOnInit();
    }
  }
}
