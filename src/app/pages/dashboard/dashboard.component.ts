import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { Client } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data : Client[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
    this.api.get('/client').subscribe(
      (data) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }

}
