import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RepairBookingDetailsComponent} from "./repair-booking-details/repair-booking-details.component";
import {RepairBookingListComponent} from "./repair-booking-list/repair-booking-list.component";

const routes: Routes = [
  { path: '', component: RepairBookingListComponent },
  { path: 'rb-details/:id', component: RepairBookingDetailsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairBookingRoutingModule { }
