import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientComponent} from "./client/client.component";
import {CarComponent} from "./car/car.component";
import {NewRepairBookingComponent} from "./new-repair-booking/new-repair-booking.component";
import {ClientRoutingModule} from "./client-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { ClientListComponent } from './client-list/client-list.component';
import { CarListComponent } from './car-list/car-list.component';



@NgModule({
  declarations: [
    ClientComponent,
    CarComponent,
    NewRepairBookingComponent,
    ClientListComponent,
    CarListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
