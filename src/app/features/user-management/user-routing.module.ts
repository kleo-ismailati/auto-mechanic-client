import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManagementComponent} from "./pages/user-management/user-management.component";
import {UserDetailsComponent} from "./pages/user-details/user-details.component";

const routes: Routes = [
  {path: '', component: UserManagementComponent},
  {path: ':id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
