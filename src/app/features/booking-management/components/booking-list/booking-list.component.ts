import {Component, OnInit} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {ApiService} from "../../../../core/services/api.service";
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {AlertService} from "../../../../core/services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BookingItem} from "../../models/booking-item.model";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  data: PagedResponse<BookingItem> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

  repairStatus = RepairStatus;
  deleteId = -1;

  constructor(
    private api: ApiService,
    private alertService: AlertService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.deleteId = -1;

    this.api.get('/api/bookings').subscribe(
      (data: PagedResponse<BookingItem>) => {
        this.data = data;
      }
    );
  }

  delete(): void {
    this.modalService.dismissAll();
    this.api.delete(`/api/bookings/${this.deleteId}`).subscribe(
      () => {
        this.alertService.warn("Repair Booking with id " + this.deleteId + " deleted!", {autoClose: true})
        this.ngOnInit();
      }
    )
  }

  paginate(event: any) {
    this.api.get(`/api/bookings?page=${event.page}`).subscribe(
      (data: PagedResponse<BookingItem>) => {
        this.data = data;
      }
    );
  }

  confirmDelete(id: number | undefined) {
    this.deleteId = id || -1;
  }

  cancelDelete() {
    this.modalService.dismissAll();
    this.deleteId = -1;
  }
}
