import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { RepairBooking } from 'src/app/core/models/repair-booking.model';
import {RepairStatus} from "../../core/models/repair-status-enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: RepairBooking | any;
  searchTerm: String = '';
  result: Boolean = false;
  repairStatus = RepairStatus;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  search(){
    this.api.get('/api/repair_booking/view/' + this.searchTerm).subscribe(
      (data:RepairBooking) => {
        this.data = data;
        if(this.data && this.searchTerm !== ''){
          this.result = true;
        }else{
          this.result = false;
        }
        console.log(this.data);
      }
    );
  }

}
