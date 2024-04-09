import {Component, TemplateRef, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {BookingItem} from "../../models/booking-item.model";
import {BookingManagementService} from "../../booking-management.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-booking-management-page',
  templateUrl: './booking-management-page.component.html',
  styleUrls: ['./booking-management-page.component.css']
})
export class BookingManagementPageComponent {

  @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;

  bookings: PagedResponse<BookingItem> = {
    pageNo: 0,
    size: 0,
    total: 0,
    result: []
  };

  deleteId: number = -1;

  constructor(
    private bookingManagementService: BookingManagementService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.bookingManagementService.getBookingList().subscribe(
      (data: PagedResponse<BookingItem>) => {
        this.bookings = data;
      }
    );
  }

  deleteBooking(bookingId: number) {
    this.deleteId = bookingId;
    this.modalService.open(this.confirmModal);
  }

  checkIfBookingDeleted(isBookingDeleted: boolean) {
    if (isBookingDeleted) {
      this.ngOnInit();
    }
  }
}
