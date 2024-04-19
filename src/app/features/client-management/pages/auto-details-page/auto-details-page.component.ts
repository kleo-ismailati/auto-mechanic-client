import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Breadcrumb } from '../../../../shared/models/breadcrumb.model'
import { Auto } from '../../models/auto.model'
import { HttpHeaders } from '@angular/common/http'
import { ClientManagementService } from '../../client-management.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AlertService } from '../../../../core/services/alert.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BookingCreate } from '../../../booking-management/models/booking-create.model'

@Component({
    selector: 'app-auto-details-page',
    templateUrl: './auto-details-page.component.html',
    styleUrls: ['./auto-details-page.component.css'],
})
export class AutoDetailsPageComponent implements OnInit {
    @ViewChild('addBookingModal') addBookingModal!: TemplateRef<any>

    breadcrumbParentsList: Breadcrumb[] = [
        {
            link: '/clients',
            label: 'Clients',
        },
        {
            link: '/clients/0',
            label: '',
        },
    ]

    auto: Auto = {
        autoDescription: '',
        autoModel: '',
        autoType: '',
        color: '',
        id: 0,
        year: '',
        imageId: '',
    }

    autoId: number = -1
    clientId: number = -1

    headers: HttpHeaders = new HttpHeaders().set('Accept', 'image/*')
    imageToShow: any

    constructor(
        private clientManagementService: ClientManagementService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.clientId = +this.route.snapshot.paramMap.get('id')!
        this.autoId = +this.route.snapshot.paramMap.get('autoId')!
        this.clientManagementService
            .getAuto(this.autoId)
            .subscribe((data: Auto) => {
                this.auto = data
                if (this.auto.imageId != null) {
                    this.clientManagementService
                        .getImage(this.auto.imageId, this.headers)
                        .subscribe((image) => {
                            this.createImageFromBlob(image)
                        })
                }
            })

        this.breadcrumbParentsList[1] = {
            link: `/clients/${this.clientId}`,
            label: 'Current client',
        }
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader()
        reader.addEventListener(
            'load',
            () => {
                this.imageToShow = reader.result
            },
            false
        )

        if (image) {
            reader.readAsDataURL(image)
        }
    }

    onUpdateAuto(auto: Auto) {
        this.clientManagementService
            .updateAuto(this.autoId, auto)
            .subscribe(() => {
                this.alertService.success('Auto was updated successfully!', {
                    autoClose: true,
                })
                this.ngOnInit()
            })
    }

    onIsAddingBooking(isAddingBooking: boolean) {
        if (isAddingBooking) {
            this.modalService.open(this.addBookingModal)
        }
    }

    onChangeImage(image: FormData) {
        this.clientManagementService
            .setImageForAuto(this.autoId, image)
            .subscribe({
                next: () => {
                    this.alertService.success(
                        'Image was changed successfully!',
                        {
                            autoClose: true,
                            keepAfterRouteChange: false,
                        }
                    )
                    this.ngOnInit()
                },
                error: () => {
                    this.alertService.error('Image could not be changed!', {
                        autoClose: true,
                        keepAfterRouteChange: false,
                    })
                },
            })
    }

    onAddBooking(booking: BookingCreate | null) {
        this.modalService.dismissAll()
        if (booking) {
            booking.clientId = this.clientId
            booking.autoId = this.autoId
            this.clientManagementService
                .createBooking(booking)
                .subscribe(() => {
                    this.alertService.success(
                        'Booking was added successfully! Redirecting to Bookings...',
                        { autoClose: true, keepAfterRouteChange: true }
                    )
                    setTimeout(() => {
                        this.router.navigate(['bookings']).then((r) => r)
                    }, 3000)
                })
        }
    }
}
