import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../models/user.model";
import {UserService} from "../../../../core/services/user-service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../core/services/alert.service";
import {UserSession} from "../../models/user-session.model";
import {Table} from "primeng/table";
import {UserManagementService} from "../../user-management.service";
import {UserCreate} from "../../models/user-create.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  users!: User[];

  newUser: UserCreate = {email: '', username: '', password: ''};

  loggedUser!: UserSession;

  newUserForm: FormGroup;

  constructor(
    private userManagementService: UserManagementService,
    private userService: UserService,
    public modalService: NgbModal,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.newUserForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.newUser = {email: '', username: '', password: ''};
    this.newUserForm.reset();
    this.userService.loggedUser.subscribe(
      (user) => {
        if (user != null) {
          this.loggedUser = user;
        }
      }
    )

    this.userManagementService.getUserList().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newUserForm.controls;
  }

  cancelAddNewUser() {
    this.newUser = {email: '', username: '', password: ''};
    this.modalService.dismissAll();
  }

  addNewUser() {
    this.newUser = {
      username: this.newUserForm.value['username'],
      email: this.newUserForm.value['email'],
      password: this.newUserForm.value['password'],
    }
    this.userManagementService.addUser(this.newUser).subscribe(
      () => {
        this.modalService.dismissAll();
        this.alertService.success("User was added successfully", {autoClose: true})
        this.ngOnInit();
      }
    );
  }

  filter(dataTable: Table, event: Event | null) {
    if (event) {
      const element: HTMLInputElement = event?.target as HTMLInputElement;
      dataTable.filterGlobal(element.value, 'contains');
    }
  }

  clear(table: Table) {
    this.searchInput.nativeElement.value = '';
    table.clear();
  }
}
