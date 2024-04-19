import { Component, TemplateRef, ViewChild } from '@angular/core'
import { PagedResponse } from '../../../../core/models/paged.response.model'
import { BookingItem } from '../../models/booking-item.model'
import { BookingManagementService } from '../../booking-management.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AlertService } from '../../../../core/services/alert.service'

@Component({
    selector: 'app-booking-management-page',
    templateUrl: './booking-management-page.component.html',
    styleUrls: ['./booking-management-page.component.css'],
})
export class BookingManagementPageComponent {
    @ViewChild('confirmModal') confirmModal!: TemplateRef<any>

    bookings: PagedResponse<BookingItem> = {
        pageNo: 0,
        size: 0,
        total: 0,
        result: [],
    }

    deleteId: number = -1

    constructor(
        private bookingManagementService: BookingManagementService,
        private alertService: AlertService,
        public modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.bookingManagementService
            .getBookingList()
            .subscribe((data: PagedResponse<BookingItem>) => {
                this.bookings = data
            })
    }

    onDeleteBooking(bookingId: number) {
        this.deleteId = bookingId
        this.modalService.open(this.confirmModal)
    }

    onDeleteBookingConfirmed(isConfirmed: boolean) {
        this.modalService.dismissAll()
        if (isConfirmed) {
            this.bookingManagementService
                .deleteBooking(this.deleteId)
                .subscribe(() => {
                    this.alertService.warn(
                        'Booking with id ' + this.deleteId + ' deleted!',
                        { autoClose: true }
                    )
                    this.deleteId = -1
                    this.ngOnInit()
                })
        } else {
            this.deleteId = -1
        }
    }

    onSwitchToPage(pageNo: number) {
        this.bookingManagementService
            .getBookingPage(pageNo)
            .subscribe((data: PagedResponse<BookingItem>) => {
                this.bookings = data
            })
    }
}
