import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {TrackerComponent} from './components/tracker/tracker.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";
import {BookingTrackerComponent} from './pages/booking-tracker/booking-tracker.component';


@NgModule({
  declarations: [
    TrackerComponent,
    BookingTrackerComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class HomeModule {
}
