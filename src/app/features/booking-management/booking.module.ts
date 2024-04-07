import {NgModule} from "@angular/core";
import {PaginatorModule} from "primeng/paginator";
import {BookingRoutingModule} from "./booking-routing.module";
import {BookingListComponent} from "./components/booking-list/booking-list.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BookingDetailsComponent} from './components/booking-details/booking-details.component';
import {BookingManagementComponent} from './pages/booking-management/booking-management.component';
import {BookingInfoComponent} from "./pages/booking-info/booking-info.component";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AddRepairModalComponent} from './components/add-repair-modal/add-repair-modal.component';
import {BookingManagementService} from "./booking-management.service";
import {BookingRepairsComponent} from './components/booking-repairs/booking-repairs.component';
import {DeleteRepairModalComponent} from './components/delete-repair-modal/delete-repair-modal.component';

@NgModule({
  declarations: [
    BookingListComponent,
    BookingDetailsComponent,
    BookingInfoComponent,
    BookingManagementComponent,
    AddRepairModalComponent,
    BookingRepairsComponent,
    DeleteRepairModalComponent
  ],
  imports: [
    BookingRoutingModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    TagModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
    BookingManagementService
  ]
})
export class BookingModule {
}
