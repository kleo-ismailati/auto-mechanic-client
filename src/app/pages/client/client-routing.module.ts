import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {CarComponent} from "./car/car.component";
import {NewRepairBookingComponent} from "./new-repair-booking/new-repair-booking.component";
import {ClientListComponent} from "./client-list/client-list.component";
import {CarListComponent} from "./car-list/car-list.component";

const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: ':id', component: ClientComponent },
  { path: ':id/cars', component: CarListComponent},
  { path: ':id/cars/:carsId', component: CarComponent },
  { path: ':id/cars/add-rb', component: NewRepairBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
