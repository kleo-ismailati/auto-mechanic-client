import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../../../core/models/car.model";
import {NewRepairBooking} from "../../../core/models/repair-booking.model";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  breadcrumbParentsList = [
    {
      link: "/client",
      label: "Clients",
    },
    {
      link: "/client/0",
      label: ""
    }
  ];

  data: Car = {
    carDescription: "",
    carModel: "",
    carType: "",
    color: "",
    id: 0,
    year: ""
  }

  isEdit: boolean = false;
  isAddRb = false;
  newRb: NewRepairBooking = {
    carId: 0,
    clientId: 0,
    repairs: [
      {
        repairCost : 0,
        repairDetails: '',
        repairType: ''
      }
    ]
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let carId = this.route.snapshot.paramMap.get('carId');
    this.api.get('/api/car/' + carId).subscribe(
      (data:Car) => {
        this.data = data;
      }
    );
    this.breadcrumbParentsList[1] =
      {
        link: `/client/${id}`,
        label: `Client ${id}`
      };
  }

  submit() {
    let data : Car = {
      id: this.data.id,
      carType: this.data.carType,
      carDescription: this.data.carDescription,
      carModel: this.data.carModel,
      year: this.data.year,
      color: this.data.color
    };
    let carId = this.route.snapshot.paramMap.get('carId');
    this.api.put('/api/car/' + carId, data).subscribe(
      () => {
        this.isEdit = false;
        this.ngOnInit();
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  cancel() {
    this.isEdit = false;
    this.ngOnInit();
  }

  addNewRb() {
    this.isAddRb = true;
  }

  lastOfList(idx: number) {
    return (this.newRb.repairs?.length == idx+1);
  }

  addOther() {
    this.newRb.repairs?.push(
      {
        repairCost : 0,
        repairDetails: '',
        repairType: ''
      }
    )
  }

  cancelNewRB() {
    this.resetRb();
    this.isAddRb = false;
  }

  resetRb(){
    this.newRb = {
      carId: 0,
      clientId: 0,
      repairs: [
        {
          repairCost : 0,
          repairDetails: '',
          repairType: ''
        }
      ]
    };
  }

  submitNewRB() {
    let id = this.route.snapshot.paramMap.get('id');
    let carId = this.route.snapshot.paramMap.get('carId');
    if(id != null && carId != null){
      this.newRb.clientId = Number(id);
      this.newRb.carId = Number(carId);
      this.api.post('/api/repair_booking', this.newRb).subscribe(
        ()=>{
          this.isAddRb = false;
          this.resetRb();
          this.router.navigate(['repair-booking']);
        }
      )
    }
    this.isAddRb = false;
  }
}
