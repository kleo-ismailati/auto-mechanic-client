import { Component, OnInit } from '@angular/core';
import {Client} from "../../../core/models/client.model";
import {ApiService} from "../../../core/services/api.service";
import {HelperService} from "../../../core/services/helper.service";
import {ActivatedRoute} from "@angular/router";
import {Car} from "../../../core/models/car.model";

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
  addingNewCar: boolean = false;
  newCar = {
    carType: "",
    carDescription: "",
    carModel: "",
    color: "",
    year: ""
  }
  private carEditId = -1;

  constructor(
    private api: ApiService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get('/api/client/' + id).subscribe(
      (data:Client) => {
        this.data = data;
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  submit() {
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
        this.ngOnInit();
      }
    );
  }

  enableCarEdit(id: number) {
    if(this.carEditId == -1){
      this.carEditId = id;
    }
  }

  submitCar(car: Car) {
    let carPayload: Car = {
      color: car.color,
      year: car.year,
      id: car.id,
      carType: car.carType,
      carModel: car.carModel,
      carDescription: car.carDescription
    }
    this.api.put('/api/car/'+ car.id, carPayload).subscribe(
      ()=> {
        this.carEditId = -1;
        this.ngOnInit();
      }
    )
  }
  submitNewCar(){
    let id = this.route.snapshot.paramMap.get('id');
    this.api.post(`/api/client/${id}/addCar`, this.newCar).subscribe(
      () => {
        this.addingNewCar = false;
        this.ngOnInit();
      }
    )
  }

  cancelNewCar() {
    this.newCar = {
      carType: "",
      carDescription: "",
      carModel: "",
      color: "",
      year: ""
    }
    this.addingNewCar = false;
  }

  addCar(){
    this.addingNewCar = true;
  }

  isCarEdit(id: number) {
    return id == this.carEditId;
  }

  deleteCar(id: number) {
    this.api.delete('/api/car/'+ id).subscribe(
      ()=> {
        this.ngOnInit();
      }
    )
  }
}
