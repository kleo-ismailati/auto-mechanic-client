import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserSession } from '../../models/user-session.model';
import { UserManagementService } from '../../user-management.service';
import { UserService } from '../../../../core/services/user-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../../core/services/alert.service';
import { UserCreate } from '../../models/user-create.model';

@Component({
    selector: 'app-user-management-page',
    templateUrl: './user-management-page.component.html',
    styleUrls: ['./user-management-page.component.css'],
})
export class UserManagementPageComponent implements OnInit {
    @ViewChild('addUser') addUser!: TemplateRef<any>;

    users!: User[];
    loggedUser!: UserSession;

    constructor(
        private userManagementService: UserManagementService,
        private userService: UserService,
        public modalService: NgbModal,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.userService.loggedUser.subscribe((user) => {
            if (user != null) {
                this.loggedUser = user;
            }
        });

        this.userManagementService.getUserList().subscribe((data: User[]) => {
            this.users = data;
        });
    }

    onShowAddUser(isAddUser: boolean) {
        if (isAddUser) {
            this.modalService.open(this.addUser);
        }
    }

    onAddUser(user: UserCreate | null) {
        this.modalService.dismissAll();
        if (user) {
            this.userManagementService.addUser(user).subscribe(() => {
                this.alertService.success('User was added successfully', {
                    autoClose: true,
                });
                this.ngOnInit();
            });
        }
    }
}
