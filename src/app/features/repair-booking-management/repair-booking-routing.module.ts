import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingManagementComponent} from "./pages/booking-management/booking-management.component";
import {BookingDetailsComponent} from "./pages/booking-details/booking-details.component";

const routes: Routes = [
  {path: '', component: BookingManagementComponent},
  {path: 'rb-details/:id', component: BookingDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairBookingRoutingModule {
}
