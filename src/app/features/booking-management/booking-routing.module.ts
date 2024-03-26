import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingManagementComponent} from "./pages/booking-management/booking-management.component";
import {BookingInfoComponent} from "./pages/booking-info/booking-info.component";

const routes: Routes = [
  {path: '', component: BookingManagementComponent},
  {path: 'booking-details/:id', component: BookingInfoComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
