import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewRepairBookingComponent} from "./new-repair-booking/new-repair-booking.component";
import {RepairBookingDetailsComponent} from "./repair-booking-details/repair-booking-details.component";
import {RepairBookingComponent} from "./repair-booking.component";

const routes: Routes = [
  { path: '', component: RepairBookingComponent },
  { path: 'new-rb', component: NewRepairBookingComponent},
  { path: 'rb-details/:id', component: RepairBookingDetailsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairBookingRoutingModule { }
