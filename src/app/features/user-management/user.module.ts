import {NgModule} from "@angular/core";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {UserComponent} from './components/user/user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDetailsComponent} from './pages/user-details/user-details.component';
import {UserManagementComponent} from './pages/user-management/user-management.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    UserDetailsComponent,
    UserManagementComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    TableModule
  ]
})
export class UserModule {
}
