import {NgModule} from '@angular/core';
import {PaginatorModule} from 'primeng/paginator';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {StatCardComponent} from './components/stat-card/stat-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    StatCardComponent
  ],
  imports: [
    DashboardRoutingModule,
    PaginatorModule,
    SharedModule
  ]
})
export class DashboardModule {
}
