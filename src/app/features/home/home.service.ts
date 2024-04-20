import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookingSummary } from '../booking-management/models/booking-summary.model';

@Injectable()
export class HomeService {
    constructor(private api: ApiService) {}

    getBookingSummary(referenceId: string): Observable<BookingSummary> {
        return this.api.get(environment.booking_view_url + '/' + referenceId);
    }
}
