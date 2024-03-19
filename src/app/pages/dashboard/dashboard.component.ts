import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {Stats} from "../../core/models/stats.model";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Stats = {
    totalAutos: 0,
    totalIncome: 0,
    totalClients: 0,
    totalRepairBookingsActive: 0,
  };

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {

    this.api.get('/api/stats').subscribe(
      (data: Stats) => {
        this.data = data;
      }
    );
  }

}
