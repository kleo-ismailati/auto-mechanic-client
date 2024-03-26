import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../../core/services/alert.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/users",
      label: "Users",
    }
  ];

  data!: User;
  isEdit: boolean = false;
  newPassword: string = '';
  addNewPassword: boolean = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.isEdit = false;
    this.newPassword = '';
    this.addNewPassword = false;
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get('/users/' + id).subscribe(
      (data: User) => {
        this.data = data;
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
    this.modalService.dismissAll();
    let data: User = {
      email: this.data.email,
      id: 0,
      username: this.data.username
    }
    if (this.newPassword != '') {
      data.password = this.newPassword;
    }
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put('/users/' + id, data).subscribe(
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
