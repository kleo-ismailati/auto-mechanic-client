import { NgModule } from '@angular/core'
import { PaginatorModule } from 'primeng/paginator'
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module'
import { SharedModule } from '../../shared/shared.module'
import { AdminDashboardPageComponent } from './pages/admin-dashboard-page/admin-dashboard-page.component'
import { StatCardComponent } from './components/stat-card/stat-card.component'
import { AdminDashboardService } from './admin-dashboard.service'

@NgModule({
    declarations: [AdminDashboardPageComponent, StatCardComponent],
    imports: [AdminDashboardRoutingModule, PaginatorModule, SharedModule],
    providers: [AdminDashboardService],
})
export class AdminDashboardModule {}
