import { Component, EventEmitter, Output } from '@angular/core'
import { BookingCreate } from '../../../booking-management/models/booking-create.model'

@Component({
    selector: 'app-add-booking-modal',
    templateUrl: './add-booking-modal.component.html',
    styleUrls: ['./add-booking-modal.component.css'],
})
export class AddBookingModalComponent {
    @Output() addBooking = new EventEmitter<BookingCreate | null>()

    newBooking: BookingCreate = {
        autoId: 0,
        clientId: 0,
        repairs: [
            {
                repairCost: 0,
                repairDetails: '',
                repairType: '',
            },
        ],
    }

    submitNewBooking() {
        this.addBooking.emit(this.newBooking)
        this.resetBooking()
    }

    addOtherRepair() {
        this.newBooking.repairs?.push({
            repairCost: 0,
            repairDetails: '',
            repairType: '',
        })
    }

    cancelNewBooking() {
        this.resetBooking()
        this.addBooking.emit(null)
    }

    resetBooking() {
        this.newBooking = {
            autoId: 0,
            clientId: 0,
            repairs: [
                {
                    repairCost: 0,
                    repairDetails: '',
                    repairType: '',
                },
            ],
        }
    }

    removeRepair(idx: number) {
        if (this.newBooking.repairs.length > 1) {
            this.newBooking.repairs = this.newBooking.repairs.filter(
                (repair, index) => index !== idx
            )
        }
    }
}
