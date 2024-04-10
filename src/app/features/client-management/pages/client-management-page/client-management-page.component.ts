import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {Client} from "../../models/client.model";
import {ClientManagementService} from "../../client-management.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../../core/services/alert.service";
import {ClientItem} from "../../models/client-item.model";
import {ClientCreate} from "../../models/client-create.model";

@Component({
  selector: 'app-client-management-page',
  templateUrl: './client-management-page.component.html',
  styleUrls: ['./client-management-page.component.css']
})
export class ClientManagementPageComponent implements OnInit {

  @ViewChild('addClientModal') addClientModal!: TemplateRef<any>;

  clients: PagedResponse<ClientItem> = {
    pageNo: 0,
    size: 0,
    total: 0,
    result: []
  };

  constructor(
    private clientManagementService: ClientManagementService,
    public modalService: NgbModal,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.clientManagementService.getClientList().subscribe(
      (data: PagedResponse<Client>) => {
        this.clients = data;
      }
    );
  }

  onSwitchToPage(page: number) {
    this.clientManagementService.getClientPage(page).subscribe(
      (data: PagedResponse<Client>) => {
        this.clients = data;
      }
    );
  }

  onAddingClient(isAdding: boolean) {
    if (isAdding) {
      this.modalService.open(this.addClientModal);
    }
  }

  onAddClient(client: ClientCreate | null) {
    this.modalService.dismissAll();
    if (client) {
      this.clientManagementService.addClient(client).subscribe(
        {
          next: (() => {
            this.alertService.success("New client was added successfully!", {autoClose: true});
            this.ngOnInit();
          }),
          error: (() => {
            this.alertService.error("An error has occurred", {autoClose: true});
          })
        }
      );
    }
  }
}
