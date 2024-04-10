import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Breadcrumb} from "../../../../shared/models/breadcrumb.model";
import {Client} from "../../models/client.model";
import {AutoCreate} from "../../models/auto-create.model";
import {ClientManagementService} from "../../client-management.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-client-details-page',
  templateUrl: './client-details-page.component.html',
  styleUrls: ['./client-details-page.component.css']
})
export class ClientDetailsPageComponent implements OnInit {

  @ViewChild('addAutoModal') addAutoModal!: TemplateRef<any>;

  breadcrumbParentsList: Breadcrumb[] = [
    {
      link: "/clients",
      label: "Clients",
    }
  ];

  client: Client = {
    id: 0,
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };

  clientId: number = -1;

  constructor(
    private clientManagementService: ClientManagementService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('id')!;
    this.clientManagementService.getClient(this.clientId).subscribe(
      (data: Client) => {
        this.client = data;
        for (let auto of this.client.autos!) {
          if (auto.thumbnail) {
            auto.thumbnail.data = this.sanitizer.bypassSecurityTrustUrl(`data:${auto.thumbnail.type};base64,` + auto.thumbnail.data);
          }
        }
      }
    );
  }

  onAddAuto(auto: AutoCreate | null) {
    this.modalService.dismissAll();
    if (auto) {
      this.clientManagementService.addAuto(this.clientId, auto).subscribe({
          next: (() => {
            this.alertService.success("New auto was added successfully!", {autoClose: true});
            this.ngOnInit();
          }),
          error: (() => {
            this.alertService.error("An error has occurred", {autoClose: true});
          })
        }
      )
    }
  }

  onAddingAuto(isAddingAuto: boolean) {
    if (isAddingAuto) {
      this.modalService.open(this.addAutoModal);
    }
  }

  onUpdateClient(client: Client) {
    this.clientManagementService.editClient(this.clientId, client).subscribe(
      () => {
        this.alertService.success("Client was updated successfully!", {autoClose: true});
        this.ngOnInit();
      }
    );
  }
}
