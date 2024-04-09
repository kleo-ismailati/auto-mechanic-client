import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../../core/services/alert.service";
import {UserManagementService} from "../../user-management.service";
import {UserUpdate} from "../../models/user-update.model";
import {Breadcrumb} from "../../../../shared/models/breadcrumb.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  breadcrumbParentsList: Breadcrumb[] = [
    {
      link: "/users",
      label: "Users",
    }
  ];

  user!: User;
  isEdit: boolean = false;
  newPassword: string = '';
  addNewPassword: boolean = false;

  constructor(
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.isEdit = false;
    this.newPassword = '';
    this.addNewPassword = false;
    let id: string = this.route.snapshot.paramMap.get('id')!;
    this.userManagementService.getCurrentUser(+id).subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
    this.modalService.dismissAll();
    let updatedUser: UserUpdate = {
      email: this.user.email,
      username: this.user.username
    }
    if (this.newPassword != '') {
      updatedUser.password = this.newPassword;
    }
    let id: string = this.route.snapshot.paramMap.get('id')!;
    this.userManagementService.updateUser(+id, updatedUser).subscribe(
      () => {
        this.isEdit = false;
        this.alertService.success('User was updated successfully', {autoClose: true})
        this.ngOnInit();
      }
    );
  }

  cancel() {
    this.modalService.dismissAll();
    this.isEdit = false;
    this.ngOnInit();
  }
}
