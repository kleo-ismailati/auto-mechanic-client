import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../core/models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/user",
      label: "Users",
    }
  ];

  data!: User;
  isEdit: boolean = false;
  newPassword: string = '';
  addNewPassword: boolean = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isEdit = false;
    this.newPassword = '';
    this.addNewPassword = false;
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get('/user/' + id).subscribe(
      (data:User) => {
        this.data = data;
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
    let data : User = {
      email: this.data.email,
      id: 0,
      username: this.data.username
    }
    if(this.newPassword != ''){
      data.password = this.newPassword;
    }
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put('/user/' + id, data).subscribe(
      () => {
        this.isEdit = false;
        this.ngOnInit();
      }
    );
  }

  cancel() {
    this.isEdit = false;
    this.ngOnInit();
  }
}
