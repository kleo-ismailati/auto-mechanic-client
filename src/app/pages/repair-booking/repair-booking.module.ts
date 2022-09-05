import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {RepairBookingRoutingModule} from "./repair-booking-routing.module";
import {RepairBookingComponent} from "./repair-booking.component";
import {NewRepairBookingComponent} from "./new-repair-booking/new-repair-booking.component";
import {RepairBookingDetailsComponent} from "./repair-booking-details/repair-booking-details.component";

@NgModule({
  declarations: [
    RepairBookingComponent,
    NewRepairBookingComponent,
    RepairBookingDetailsComponent
  ],
  imports: [
    CommonModule,
    RepairBookingRoutingModule,
    PaginatorModule
  ]
})
export class RepairBookingModule { }
