import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {AutoComponent} from "./auto/auto.component";
import {ClientListComponent} from "./client-list/client-list.component";

const routes: Routes = [
  {path: '', component: ClientListComponent},
  {path: ':id', component: ClientComponent},
  {path: ':id/autos/:autoId', component: AutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
