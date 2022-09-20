import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {CarComponent} from "./car/car.component";
import {ClientListComponent} from "./client-list/client-list.component";

const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: ':id', component: ClientComponent },
  { path: ':id/cars/:carId', component: CarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
