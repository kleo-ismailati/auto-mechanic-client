import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { RepairBookingViewDto } from 'src/app/core/models/list-dto/repair-booking-view-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data : RepairBookingViewDto[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
    this.api.get('/api/repair_booking').subscribe(
      (data: RepairBookingViewDto[]) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }

}
