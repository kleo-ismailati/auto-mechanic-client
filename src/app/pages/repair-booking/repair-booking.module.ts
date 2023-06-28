import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {RepairBookingRoutingModule} from "./repair-booking-routing.module";
import {RepairBookingListComponent} from "./repair-booking-list/repair-booking-list.component";
import {RepairBookingDetailsComponent} from "./repair-booking-details/repair-booking-details.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RepairBookingListComponent,
    RepairBookingDetailsComponent
  ],
  imports: [
      CommonModule,
      RepairBookingRoutingModule,
      PaginatorModule,
      SharedModule,
      ReactiveFormsModule
  ]
})
export class RepairBookingModule { }
