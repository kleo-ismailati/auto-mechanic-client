import { Component, OnInit } from '@angular/core';
import {PagedResponse} from "../../../core/models/paged.response.model";
import {RepairBooking} from "../../../core/models/repair-booking.model";
import {ApiService} from "../../../core/services/api.service";
import {RepairStatus} from "../../../core/models/repair-status-enum";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-repair-booking-list',
  templateUrl: './repair-booking-list.component.html',
  styleUrls: ['./repair-booking-list.component.css']
})
export class RepairBookingListComponent implements OnInit {

  data : PagedResponse<RepairBooking> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

  repairStatus = RepairStatus;

  constructor(private api: ApiService,
              private alertService: AlertService) { }

  ngOnInit(): void {

    this.api.get('/api/repair_booking').subscribe(
      (data: PagedResponse<RepairBooking>) => {
        this.data = data;
      }
    );
  }

  delete(id: number | undefined): void{
    this.api.delete(`/api/repair_booking/${id}`).subscribe(
      () => {
        this.alertService.warn("Repair Booking with id " + id + " deleted!", { autoClose: true })
        this.ngOnInit();
      }
    )
  }

  paginate(event: any) {
    this.api.get(`/api/repair_booking?page=${event.page}`).subscribe(
      (data: PagedResponse<RepairBooking>) => {
        this.data = data;
      }
    );
  }
}
