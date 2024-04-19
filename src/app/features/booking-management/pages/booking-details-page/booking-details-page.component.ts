import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Booking } from '../../models/booking.model'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BookingManagementService } from '../../booking-management.service'
import { Breadcrumb } from '../../../../shared/models/breadcrumb.model'
import { AlertService } from '../../../../core/services/alert.service'
import { Repair, RepairCreate } from '../../../../shared/models/repair.model'

@Component({
    selector: 'app-booking-details-page',
    templateUrl: './booking-details-page.component.html',
    styleUrls: ['./booking-details-page.component.css'],
})
export class BookingDetailsPageComponent implements OnInit {
    @ViewChild('addRepairModal') addRepairModal!: TemplateRef<any>
    @ViewChild('confirmModal') confirmModal!: TemplateRef<any>

    breadcrumbParentsList: Breadcrumb[] = [
        {
            link: '/bookings',
            label: 'Bookings',
        },
    ]

    booking!: Booking

    idOfRepairToDelete: number = -1

    constructor(
        private route: ActivatedRoute,
        private alertService: AlertService,
        private bookingManagementService: BookingManagementService,
        public modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.idOfRepairToDelete = -1

        let id: string = this.route.snapshot.paramMap.get('id')!

        this.bookingManagementService
            .getBooking(+id)
            .subscribe((data: Booking) => {
                this.booking = data
            })
    }

    onAddingRepair(isAddingNewRepair: boolean): void {
        if (isAddingNewRepair) {
            this.modalService.open(this.addRepairModal)
        } else {
            this.modalService.dismissAll()
        }
    }

    onDeleteRepairById(id: number) {
        this.idOfRepairToDelete = id
        this.modalService.open(this.confirmModal)
    }

    onAddRepair(repair: RepairCreate | null) {
        this.modalService.dismissAll()
        if (repair) {
            this.bookingManagementService
                .postNewRepair(this.booking.id!, repair)
                .subscribe(() => {
                    this.alertService.success(
                        'New repair was added successfully!',
                        {
                            autoClose: true,
                        }
                    )
                    this.ngOnInit()
                })
        }
    }

    onUpdateBooking(booking: Booking) {
        this.bookingManagementService
            .postUpdatedBooking(this.booking.id!, booking)
            .subscribe(() => {
                this.alertService.success('Booking was updated successfully!', {
                    autoClose: true,
                })
                this.ngOnInit()
            })
    }

    onUpdateRepair(repair: Repair) {
        this.bookingManagementService
            .postUpdatedRepair(repair.id, repair)
            .subscribe(() => {
                this.alertService.success('Repair was updated successfully!', {
                    autoClose: true,
                })
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                })
                this.ngOnInit()
            })
    }

    onConfirmRepairDelete(isConfirmed: boolean) {
        this.modalService.dismissAll()
        if (isConfirmed) {
            this.bookingManagementService
                .deleteRepair(this.idOfRepairToDelete)
                .subscribe(() => {
                    this.alertService.warn(
                        'Repair with id ' +
                            this.idOfRepairToDelete +
                            ' was deleted!',
                        { autoClose: true }
                    )
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    })
                    this.ngOnInit()
                })
        } else this.idOfRepairToDelete = -1
    }
}
