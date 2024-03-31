import {NgModule} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ClientComponent} from "./components/client/client.component";
import {AutoComponent} from "./components/auto/auto.component";
import {ClientRoutingModule} from "./client-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ClientListComponent} from './components/client-list/client-list.component';
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {ClientManagementComponent} from './pages/client-management/client-management.component';
import {ClientDetailsComponent} from './pages/client-details/client-details.component';
import {AutoDetailsComponent} from './pages/auto-details/auto-details.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";


@NgModule({
  declarations: [
    ClientComponent,
    AutoComponent,
    ClientListComponent,
    ClientManagementComponent,
    ClientDetailsComponent,
    AutoDetailsComponent
  ],
  imports: [
    ClientRoutingModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule
  ]
})
export class ClientModule {
}
