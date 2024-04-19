import { Component, Input } from '@angular/core'
import { RepairStatus } from '../../../../shared/enums/repair-status-enum'
import { BookingSummary } from '../../../booking-management/models/booking-summary.model'

@Component({
    selector: 'app-booking-summary',
    templateUrl: './booking-summary.component.html',
    styleUrls: ['./booking-summary.component.css'],
})
export class BookingSummaryComponent {
    protected readonly repairStatus = RepairStatus
    @Input() bookingSummary!: BookingSummary
}
