import { Component, OnInit } from '@angular/core';
import {PagedResponse} from "../../../core/models/paged.response.model";
import {ApiService} from "../../../core/services/api.service";
import {Client} from "../../../core/models/client.model";

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

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.get('/api/client').subscribe(
      (data: PagedResponse<Client>) => {
        this.data = data;
      }
    );
  }

  paginate(event: any) {
    this.api.get(`/api/repair_booking?page=${event.page}`).subscribe(
      (data: PagedResponse<Client>) => {
        this.data = data;
      }
    );
  }
}
