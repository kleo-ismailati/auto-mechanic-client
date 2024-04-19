import { Component, OnInit } from '@angular/core'
import { Stats } from '../../models/stats.model'
import { AdminDashboardService } from '../../admin-dashboard.service'

@Component({
    selector: 'app-admin-dashboard-page',
    templateUrl: './admin-dashboard-page.component.html',
    styleUrls: ['./admin-dashboard-page.component.css'],
})
export class AdminDashboardPageComponent implements OnInit {
    data: Stats = {
        totalAutos: 0,
        totalIncome: 0,
        totalClients: 0,
        totalBookingsActive: 0,
    }

    constructor(private adminDashboardService: AdminDashboardService) {}

    ngOnInit(): void {
        this.adminDashboardService.getStats().subscribe((stats: Stats) => {
            this.data = stats
        })
    }
}
