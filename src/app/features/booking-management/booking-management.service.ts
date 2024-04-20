import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Booking } from './models/booking.model';
import { Repair, RepairCreate } from '../../shared/models/repair.model';
import { PagedResponse } from '../../core/models/paged.response.model';
import { BookingItem } from './models/booking-item.model';

@Injectable()
export class BookingManagementService {
    constructor(private api: ApiService) {}

    getBooking(bookingId: number): Observable<Booking> {
        return this.api.get(environment.bookings_url + '/' + bookingId);
    }

    getBookingList(): Observable<PagedResponse<BookingItem>> {
        return this.api.get(environment.bookings_url);
    }

    getBookingPage(pageNo: number): Observable<PagedResponse<BookingItem>> {
        return this.api.get(`${environment.bookings_url}?page=${pageNo}`);
    }

    postUpdatedBooking(
        bookingId: number,
        updatedBooking: Booking
    ): Observable<any> {
        return this.api.put(
            environment.bookings_url + '/' + bookingId,
            updatedBooking
        );
    }

    deleteBooking(bookingId: number): Observable<any> {
        return this.api.delete(`${environment.bookings_url}/${bookingId}`);
    }

    postNewRepair(bookingId: number, newRepair: RepairCreate): Observable<any> {
        return this.api.post(
            environment.add_repair_url + '/' + bookingId,
            newRepair
        );
    }

    postUpdatedRepair(
        repairId: number,
        updatedRepair: Repair
    ): Observable<any> {
        return this.api.put(
            environment.repairs_url + '/' + repairId,
            updatedRepair
        );
    }

    deleteRepair(repairId: number): Observable<any> {
        return this.api.delete(environment.repairs_url + '/' + repairId);
    }
}
