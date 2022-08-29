import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { RepairBooking } from 'src/app/core/models/repair-booking.model';
import { PagedResponse } from 'src/app/core/models/paged.response.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data : PagedResponse<RepairBooking> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

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
