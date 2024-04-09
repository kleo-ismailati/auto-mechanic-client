import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BookingManagementService} from "../../booking-management.service";
import {Breadcrumb} from "../../../../shared/models/breadcrumb.model";

@Component({
  selector: 'app-booking-details-page',
  templateUrl: './booking-details-page.component.html',
  styleUrls: ['./booking-details-page.component.css']
})
export class BookingDetailsPageComponent implements OnInit {

  @ViewChild('addRepairModal') addRepairModal!: TemplateRef<any>;
  @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;

  breadcrumbParentsList: Breadcrumb[] = [
    {
      link: "/bookings",
      label: "Bookings",
    }
  ];

  data!: Booking;

  isAddingNewRepair: boolean = false;
  idOfRepairToDelete: number = -1;

  constructor(
    private route: ActivatedRoute,
    private bookingManagementService: BookingManagementService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.isAddingNewRepair = false;
    this.idOfRepairToDelete = -1;

    let id: string = this.route.snapshot.paramMap.get('id')!;

    this.bookingManagementService.getBooking(+id).subscribe(
      (data: Booking) => {
        this.data = data;
      }
    );
  }

  checkIfBookingWasUpdated(isSubmitted: boolean) {
    if (isSubmitted) {
      this.ngOnInit();
    }
  }

  checkIfAddingNewRepair(isAdding: boolean): void {
    this.isAddingNewRepair = isAdding;
    if (this.isAddingNewRepair) {
      this.modalService.open(this.addRepairModal);
    } else {
      this.modalService.dismissAll();
    }
  }

  checkIfRepairWasAdded(isRepairAdded: boolean) {
    if (isRepairAdded) {
      this.ngOnInit();
    }
  }

  showDeleteConfirmationModal(id: number) {
    this.idOfRepairToDelete = id;
    this.modalService.open(this.confirmModal);
  }

  checkIfRepairWasUpdated(isRepairUpdated: boolean) {
    if (isRepairUpdated) {
      this.ngOnInit();
    }
  }

  checkIfRepairWasDeleted(isRepairDeleted: boolean) {
    this.modalService.dismissAll();
    if (isRepairDeleted) {
      this.ngOnInit()
    }
  }
}
