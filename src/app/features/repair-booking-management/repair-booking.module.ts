import {NgModule} from "@angular/core";
import {PaginatorModule} from "primeng/paginator";
import {RepairBookingRoutingModule} from "./repair-booking-routing.module";
import {RepairBookingListComponent} from "./components/repair-booking-list/repair-booking-list.component";
import {RepairBookingDetailsComponent} from "./components/repair-booking-details/repair-booking-details.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BookingDetailsComponent} from './pages/booking-details/booking-details.component';
import {BookingManagementComponent} from './pages/booking-management/booking-management.component';

@NgModule({
  declarations: [
    RepairBookingListComponent,
    RepairBookingDetailsComponent,
    BookingDetailsComponent,
    BookingManagementComponent
  ],
  imports: [
    RepairBookingRoutingModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RepairBookingModule {
}
