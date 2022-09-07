import { Component, OnInit } from '@angular/core';
import {PagedResponse} from "../../core/models/paged.response.model";
import {RepairBooking} from "../../core/models/repair-booking.model";
import {ApiService} from "../../core/services/api.service";
import {RepairStatus} from "../../core/models/repair-status-enum";

@Component({
  selector: 'app-repair-booking',
  templateUrl: './repair-booking.component.html',
  styleUrls: ['./repair-booking.component.css']
})
export class RepairBookingComponent implements OnInit {

  data : PagedResponse<RepairBooking> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

  repairStatus = RepairStatus;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.get('/api/repair_booking').subscribe(
      (data: PagedResponse<RepairBooking>) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }

  delete(id: number | undefined): void{
    this.api.delete(`/api/repair_booking/${id}`).subscribe(
      response => {
        console.log(response);
        this.ngOnInit();
      }
    )
  }

  paginate(event: any) {
    this.api.get(`/api/repair_booking?page=${event.page}`).subscribe(
      (data: PagedResponse<RepairBooking>) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }
}
