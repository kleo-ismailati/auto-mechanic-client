import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment';
import { Stats } from './models/stats.model';
import { Observable } from 'rxjs';

@Injectable()
export class AdminDashboardService {
    constructor(private api: ApiService) {}

    getStats(): Observable<Stats> {
        return this.api.get(environment.stats_url);
    }
}
