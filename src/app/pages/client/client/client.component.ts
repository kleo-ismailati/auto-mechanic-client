import { Component, OnInit } from '@angular/core';
import {Client} from "../../../core/models/client.model";
import {ApiService} from "../../../core/services/api.service";
import {HelperService} from "../../../core/services/helper.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../core/services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/client",
      label: "Clients",
    }
  ];

  data: Client = {
    id: 0,
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };
  isEdit: boolean = false;
  newAuto = {
    autoType: "",
    autoDescription: "",
    autoModel: "",
    color: "",
    year: ""
  }
  newAutoForm: FormGroup;

  constructor(
    private api: ApiService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.newAutoForm = this.formBuilder.group({
      autoModel: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      autoType: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      color: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      year: new FormControl("", [
        Validators.required,
        Validators.pattern("^(19|20)\\d{2}$")
      ]),
      autoDescription: new FormControl("")
    })
  }

  ngOnInit(): void {
    this.newAuto = {autoType: "", autoDescription: "", autoModel: "", color: "", year: ""}
    this.newAutoForm.reset();
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get('/api/client/' + id).subscribe(
      (data:Client) => {
        this.data = data;
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newAutoForm.controls;
  }

  enableEdit() {
    this.isEdit = true;
  }

  editClient() {
    let data : Client = {
      id: this.data.id,
      address: this.data.address,
      email: this.data.email,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      phoneNumber: this.data.phoneNumber
    };
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put('/api/client/' + id, data).subscribe(
      () => {
        this.isEdit = false;
        this.alertService.success("Client was updated successfully!", { autoClose: true});
        this.ngOnInit();
      }
    );
  }

  submitNewAuto(){
    this.newAuto = {
      autoModel: this.newAutoForm.value['autoModel'],
      autoType: this.newAutoForm.value['autoType'],
      color: this.newAutoForm.value['color'],
      autoDescription: this.newAutoForm.value['autoDescription'],
      year: this.newAutoForm.value['year']
    }
    let id = this.route.snapshot.paramMap.get('id');
    this.api.post(`/api/client/${id}/addAuto`, this.newAuto).subscribe(
      () => {
        this.modalService.dismissAll();
        this.alertService.success("New auto was added successfully!", { autoClose: true});
        this.ngOnInit();
      }, () => {
        this.modalService.dismissAll();
        this.alertService.error("An error has occurred", { autoClose: true});
        this.ngOnInit();
      }
    )
  }

  cancelNewAuto() {
    this.modalService.dismissAll();
    this.newAuto = {
      autoType: "",
      autoDescription: "",
      autoModel: "",
      color: "",
      year: ""
    }
    this.newAutoForm.reset();
  }

  deleteAuto(id: number) {
    this.api.delete('/api/auto/'+ id).subscribe(
      ()=> {
        this.ngOnInit();
      }
    )
  }

  cancel() {
    this.isEdit = false;
    this.ngOnInit();
  }
}
