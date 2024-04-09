import {Component} from '@angular/core';
import {BookingSummary} from "../../../booking-management/models/booking-summary.model";

@Component({
  selector: 'app-booking-tracker-page',
  templateUrl: './booking-tracker-page.component.html',
  styleUrls: ['./booking-tracker-page.component.css']
})
export class BookingTrackerPageComponent {

  bookingSummary: BookingSummary | undefined;

  setBooking(summary: BookingSummary) {
    this.bookingSummary = summary;
  }
}
