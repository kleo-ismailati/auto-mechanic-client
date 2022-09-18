import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User, UserSession} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/user-service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  data! : User[];

  newUser: User = {email: "", id: 0, username: "", password: ""};

  loggedUser!: UserSession;

  constructor(
    private api: ApiService,
    private userService: UserService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.userService.loggedUser.subscribe(
      (next)=> {
        this.loggedUser = next;
      }
    )

    this.api.get('/user').subscribe(
      (data: User[]) => {
        this.data = data;
      }
    );
  }

  cancelAddNewUser() {
    this.newUser = {email: "", id: 0, username: "", password: ""};
    this.modalService.dismissAll();
  }

  addNewUser() {
    this.api.post('/user', this.newUser).subscribe(
      () => {
        this.modalService.dismissAll();
        this.ngOnInit();
      }
    );
  }
}
