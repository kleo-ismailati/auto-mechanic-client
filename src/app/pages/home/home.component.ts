import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { RepairBookingDto } from 'src/app/core/models/dto/repair-booking-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: RepairBookingDto | any;
  searchTerm: String = '';
  result: Boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  search(){
    this.api.get('/api/repair_booking/' + this.searchTerm).subscribe(
      (data:RepairBookingDto) => {
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
