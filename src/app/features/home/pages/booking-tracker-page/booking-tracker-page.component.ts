import { Component, OnInit } from '@angular/core';
import { BookingSummary } from '../../../booking-management/models/booking-summary.model';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HomeService } from '../../home.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
    selector: 'app-booking-tracker-page',
    templateUrl: './booking-tracker-page.component.html',
    styleUrls: ['./booking-tracker-page.component.css'],
})
export class BookingTrackerPageComponent implements OnInit {
    bookingSummary: BookingSummary | undefined;

    constructor(
        private homeService: HomeService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.bookingSummary = undefined;
    }

    onInputReferenceId(referenceId: string) {
        this.homeService.getBookingSummary(referenceId).subscribe({
            next: (data: BookingSummary) => {
                this.bookingSummary = data;
                this.alertService.success('Booking found!', {
                    autoClose: true,
                });
            },
            error: (error: HttpErrorResponse) => {
                if (error.status == HttpStatusCode.NotFound) {
                    this.bookingSummary = undefined;
                    this.alertService.error('Booking could not be found!', {
                        autoClose: true,
                    });
                }
            },
        });
    }
}
