import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { Client } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: Client | any;
  searchTerm: String = '';
  result: Boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  search(){
    this.api.get('/client/' + this.searchTerm).subscribe(
      (data) => {
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
