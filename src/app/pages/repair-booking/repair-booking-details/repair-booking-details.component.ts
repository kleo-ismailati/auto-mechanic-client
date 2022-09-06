import { Component, OnInit } from '@angular/core';
import {RepairBooking} from "../../../core/models/repair-booking.model";
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-repair-booking-details',
  templateUrl: './repair-booking-details.component.html',
  styleUrls: ['./repair-booking-details.component.css']
})
export class RepairBookingDetailsComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/repair-booking",
      label: "Bookings",
    }
  ];

  data: RepairBooking | any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get('/api/repair_booking/' + id).subscribe(
      (data:RepairBooking) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }

  enableEdit() {

  }
}
