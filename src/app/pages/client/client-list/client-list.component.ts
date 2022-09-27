import { Component, OnInit } from '@angular/core';
import {PagedResponse} from "../../../core/models/paged.response.model";
import {ApiService} from "../../../core/services/api.service";
import {Client} from "../../../core/models/client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  data : PagedResponse<Client> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

  newClient = {
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };

  newClientForm: FormGroup;

  constructor(
    private api: ApiService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.newClientForm = this.formBuilder.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^\\d{10}$")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      address: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    });
  }

  ngOnInit(): void {

    this.newClientForm.reset();
    this.newClient = { address: "", email: "", firstName: "", lastName: "", phoneNumber: ""};

    this.api.get('/api/client').subscribe(
      (data: PagedResponse<Client>) => {
        this.data = data;
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newClientForm.controls;
  }

  paginate(event: any) {
    this.api.get(`/api/repair_booking?page=${event.page}`).subscribe(
      (data: PagedResponse<Client>) => {
        this.data = data;
      }
    );
  }

  cancelAddNewClient() {
    this.newClientForm.reset();
    this.modalService.dismissAll();
  }

  addNewClient() {
    this.newClient = {
      firstName: this.newClientForm.value['firstName'],
      lastName: this.newClientForm.value['lastName'],
      phoneNumber: this.newClientForm.value['phoneNumber'],
      email: this.newClientForm.value['email'],
      address: this.newClientForm.value['address']
    }
    this.api.post('/api/client', this.newClient).subscribe(
      () => {
        this.modalService.dismissAll();
        this.alertService.success("New client was added successfully!", { autoClose: true});
        this.ngOnInit();
      },() => {
        this.modalService.dismissAll();
        this.alertService.error("An error has occurred", { autoClose: true});
        this.ngOnInit();
      }

    );

  }
}
