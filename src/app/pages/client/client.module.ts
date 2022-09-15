import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientComponent} from "./client/client.component";
import {CarComponent} from "./car/car.component";
import {NewRepairBookingComponent} from "./new-repair-booking/new-repair-booking.component";
import {ClientRoutingModule} from "./client-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { ClientListComponent } from './client-list/client-list.component';
import {PaginatorModule} from "primeng/paginator";



@NgModule({
  declarations: [
    ClientComponent,
    CarComponent,
    NewRepairBookingComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PaginatorModule,
    SharedModule
  ]
})
export class ClientModule { }
