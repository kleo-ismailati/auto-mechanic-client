import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientManagementComponent} from "./pages/client-management/client-management.component";
import {ClientDetailsComponent} from "./pages/client-details/client-details.component";
import {AutoDetailsComponent} from "./pages/auto-details/auto-details.component";

const routes: Routes = [
  {path: '', component: ClientManagementComponent},
  {path: ':id', component: ClientDetailsComponent},
  {path: ':id/autos/:autoId', component: AutoDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
