import {Component, OnInit} from '@angular/core';
import {Stats} from "../../models/stats.model";
import {ApiService} from "../../../../core/services/api.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  data: Stats = {
    totalAutos: 0,
    totalIncome: 0,
    totalClients: 0,
    totalBookingsActive: 0,
  };

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {

    this.api.get(environment.stats_url).subscribe(
      (data: Stats) => {
        this.data = data;
      }
    );
  }

}
