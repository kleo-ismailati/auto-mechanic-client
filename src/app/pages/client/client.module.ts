import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientComponent} from "./client/client.component";
import {CarComponent} from "./car/car.component";
import {ClientRoutingModule} from "./client-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { ClientListComponent } from './client-list/client-list.component';
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ClientComponent,
    CarComponent,
    ClientListComponent
  ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        PaginatorModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class ClientModule { }
