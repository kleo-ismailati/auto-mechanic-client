import {NgModule} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AutoComponent} from "./components/auto/auto.component";
import {ClientManagementRoutingModule} from "./client-management-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ClientListComponent} from './components/client-list/client-list.component';
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {ClientManagementPageComponent} from './pages/client-management-page/client-management-page.component';
import {ClientDetailsPageComponent} from './pages/client-details-page/client-details-page.component';
import {AutoDetailsPageComponent} from './pages/auto-details-page/auto-details-page.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ClientManagementService} from "./client-management.service";
import {AddClientModalComponent} from './components/add-client-modal/add-client-modal.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import {AutoListComponent} from './components/auto-list/auto-list.component';
import {AddAutoModalComponent} from './components/add-auto-modal/add-auto-modal.component';


@NgModule({
  declarations: [
    AutoComponent,
    ClientListComponent,
    ClientManagementPageComponent,
    ClientDetailsPageComponent,
    AutoDetailsPageComponent,
    AddClientModalComponent,
    ClientDetailsComponent,
    AutoListComponent,
    AddAutoModalComponent
  ],
  imports: [
    ClientManagementRoutingModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule
  ],
  providers: [
    ClientManagementService
  ]
})
export class ClientManagementModule {
}
