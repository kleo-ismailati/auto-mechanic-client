import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User, UserSession} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/user-service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data! : User[];

  newUser = {
    email: "",
    username: "",
    password: ""
  };

  loggedUser!: UserSession;
  newUserForm: FormGroup;

  constructor(
    private api: ApiService,
    private userService: UserService,
    public modalService: NgbModal,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.newUserForm = this.formBuilder.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.userService.loggedUser.subscribe(
      (user)=> {
        if (user!=null) {
          this.loggedUser = user;
        }
      }
    )

    this.api.get('/user').subscribe(
      (data: User[]) => {
        this.data = data;
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newUserForm.controls;
  }

  cancelAddNewUser() {
    this.newUser = {email: "", username: "", password: ""};
    this.modalService.dismissAll();
  }

  addNewUser() {
    this.newUser = {
      username:this.newUserForm.value['username'],
      email:this.newUserForm.value['email'],
      password:this.newUserForm.value['password'],
    }
    this.api.post('/user', this.newUser).subscribe(
      () => {
        this.modalService.dismissAll();
        this.alertService.success("User was added successfully", { autoClose: true })
        this.ngOnInit();
      }
    );
  }
}
