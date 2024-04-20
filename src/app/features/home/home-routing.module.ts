import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingTrackerPageComponent } from './pages/booking-tracker-page/booking-tracker-page.component';

const routes: Routes = [{ path: '', component: BookingTrackerPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
