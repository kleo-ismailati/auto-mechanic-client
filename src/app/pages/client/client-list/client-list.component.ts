import { Component, OnInit } from '@angular/core';
import {PagedResponse} from "../../../core/models/paged.response.model";
import {ApiService} from "../../../core/services/api.service";
import {Client} from "../../../core/models/client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  newClient: Client = {address: "", email: "", firstName: "", id: 0, lastName: "", phoneNumber: ""};

  constructor(
    private api: ApiService,
    public modalService: NgbModal
  ) { }

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

  cancelAddNewClient() {
    this.newClient = { address: "", email: "", firstName: "", id: 0, lastName: "", phoneNumber: ""};
    this.modalService.dismissAll();
  }

  addNewClient() {
    this.api.post('/api/client', this.newClient).subscribe(
      () => {
        this.modalService.dismissAll();
        this.ngOnInit();
      }
    );

  }
}
