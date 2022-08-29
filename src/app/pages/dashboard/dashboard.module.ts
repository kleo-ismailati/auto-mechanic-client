import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PaginatorModule
  ]
})
export class DashboardModule { }
