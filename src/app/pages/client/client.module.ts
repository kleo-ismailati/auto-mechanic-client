import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ClientComponent} from "./client/client.component";
import {AutoComponent} from "./auto/auto.component";
import {ClientRoutingModule} from "./client-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ClientListComponent} from './client-list/client-list.component';
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ClientComponent,
    AutoComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class ClientModule {
}
