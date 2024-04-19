import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Breadcrumb } from '../../../../shared/models/breadcrumb.model'
import { User } from '../../models/user.model'
import { UserManagementService } from '../../user-management.service'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserUpdate } from '../../models/user-update.model'
import { AlertService } from '../../../../core/services/alert.service'

@Component({
    selector: 'app-user-details-page',
    templateUrl: './user-details-page.component.html',
    styleUrls: ['./user-details-page.component.css'],
})
export class UserDetailsPageComponent implements OnInit {
    @ViewChild('confirmModal') confirmModal!: TemplateRef<any>

    breadcrumbParentsList: Breadcrumb[] = [
        {
            link: '/users',
            label: 'Users',
        },
    ]
    user!: User
    updatedUser: UserUpdate | null = null

    constructor(
        private userManagementService: UserManagementService,
        private route: ActivatedRoute,
        public modalService: NgbModal,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        let id: string = this.route.snapshot.paramMap.get('id')!
        this.userManagementService
            .getCurrentUser(+id)
            .subscribe((user: User) => {
                this.user = user
            })
    }

    onUpdateUser(updatedUser: UserUpdate | null) {
        if (updatedUser) {
            this.updatedUser = updatedUser
            this.modalService.open(this.confirmModal)
        } else this.modalService.dismissAll()
    }

    onUpdateConfirmed(isConfirmed: boolean) {
        if (isConfirmed) {
            this.updateUser(this.updatedUser!)
            this.ngOnInit()
        } else {
            this.updatedUser = null
        }
        this.modalService.dismissAll()
    }

    updateUser(updatedUser: UserUpdate) {
        let id: string = this.route.snapshot.paramMap.get('id')!
        this.userManagementService
            .updateUser(+id, updatedUser)
            .subscribe(() => {
                this.alertService.success('User was updated successfully', {
                    autoClose: true,
                })
                this.ngOnInit()
            })
    }
}
