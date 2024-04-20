import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingManagementPageComponent } from './pages/booking-management-page/booking-management-page.component';
import { BookingDetailsPageComponent } from './pages/booking-details-page/booking-details-page.component';

const routes: Routes = [
    { path: '', component: BookingManagementPageComponent },
    { path: 'booking-details/:id', component: BookingDetailsPageComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookingManagementRoutingModule {}
