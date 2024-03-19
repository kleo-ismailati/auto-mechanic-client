import {Component, OnInit} from '@angular/core';
import {PagedResponse} from "../../../core/models/paged.response.model";
import {ApiService} from "../../../core/services/api.service";
import {RepairStatus} from "../../../core/models/repair-status-enum";
import {AlertService} from "../../../core/services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RepairBookingView} from "../../../core/models/repair-booking-view.model";

@Component({
  selector: 'app-repair-booking-list',
  templateUrl: './repair-booking-list.component.html',
  styleUrls: ['./repair-booking-list.component.css']
})
export class RepairBookingListComponent implements OnInit {

  data: PagedResponse<RepairBookingView> = {
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

    this.api.get('/api/repair_booking').subscribe(
      (data: PagedResponse<RepairBookingView>) => {
        this.data = data;
      }
    );
  }

  delete(): void {
    this.modalService.dismissAll();
    this.api.delete(`/api/repair_booking/${this.deleteId}`).subscribe(
      () => {
        this.alertService.warn("Repair Booking with id " + this.deleteId + " deleted!", {autoClose: true})
        this.ngOnInit();
      }
    )
  }

  paginate(event: any) {
    this.api.get(`/api/repair_booking?page=${event.page}`).subscribe(
      (data: PagedResponse<RepairBookingView>) => {
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
