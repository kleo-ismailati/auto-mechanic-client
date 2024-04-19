import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RepairStatus } from '../../../../shared/enums/repair-status-enum'
import { Booking } from '../../models/booking.model'
import { HelperService } from '../../../../core/utilities/helper.service'

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
    @Input() bookingInfo!: Booking
    @Output() updateBooking = new EventEmitter<Booking>()
    @Output() addingRepair = new EventEmitter<boolean>()

    protected readonly repairStatus = RepairStatus
    repairStatusKeys: number[] = []

    isEdit: boolean = false

    updatedBookingInfo: Booking

    constructor(private helperService: HelperService) {
        this.updatedBookingInfo = { ...this.bookingInfo }
        this.repairStatusKeys = this.helperService.getEnumKeysArray(
            this.repairStatus
        )
    }

    ngOnInit(): void {
        this.isEdit = false
    }

    enableEdit() {
        this.isEdit = true
        this.updatedBookingInfo = { ...this.bookingInfo }
    }

    bookingUpdate() {
        this.updateBooking.emit(this.updatedBookingInfo)
        this.isEdit = false
        this.ngOnInit()
    }

    addRepair() {
        this.addingRepair.emit(true)
    }

    cancelUpdate() {
        this.ngOnInit()
    }
}
