import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {ApiService} from "../../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-booking-details-page',
  templateUrl: './booking-details-page.component.html',
  styleUrls: ['./booking-details-page.component.css']
})
export class BookingDetailsPageComponent implements OnInit {

  @ViewChild('addRepairModal') addRepairModal!: TemplateRef<any>;
  @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;

  breadcrumbParentsList = [
    {
      link: "/bookings",
      label: "Bookings",
    }
  ];

  data!: Booking;

  isAddingNewRepair: boolean = false;
  idOfRepairToDelete = -1;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.isAddingNewRepair = false;
    this.idOfRepairToDelete = -1;

    let id = this.route.snapshot.paramMap.get('id');

    this.api.get(environment.bookings_url + '/' + id).subscribe(
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
