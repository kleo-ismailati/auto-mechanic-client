import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingTrackerComponent} from "./pages/booking-tracker/booking-tracker.component";

const routes: Routes = [{path: '', component: BookingTrackerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
