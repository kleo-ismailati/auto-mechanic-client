import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '../../shared/shared.module'
import { BookingTrackerPageComponent } from './pages/booking-tracker-page/booking-tracker-page.component'
import { HomeService } from './home.service'
import { SearchReferenceComponent } from './components/search-reference/search-reference.component'
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component'

@NgModule({
    declarations: [
        BookingTrackerPageComponent,
        SearchReferenceComponent,
        BookingSummaryComponent,
    ],
    imports: [HomeRoutingModule, FormsModule, SharedModule],
    providers: [HomeService],
})
export class HomeModule {}
