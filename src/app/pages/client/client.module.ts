import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClientComponent} from "./client.component";
import {ClientRoutingModule} from "./client-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    ClientComponent
  ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        SharedModule
    ]
})
export class ClientModule { }
