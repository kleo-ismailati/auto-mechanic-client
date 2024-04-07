import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {TrackerComponent} from './components/tracker/tracker.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";
import {BookingTrackerPageComponent} from './pages/booking-tracker-page/booking-tracker-page.component';
import {HomeService} from "./home.service";


@NgModule({
  declarations: [
    TrackerComponent,
    BookingTrackerPageComponent
  ],
  imports: [
    HomeRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
