import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {Client} from "../../models/client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../core/services/alert.service";
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {Table} from "primeng/table";
import {ClientManagementService} from "../../client-management.service";
import {ClientCreate} from "../../models/client-create.model";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  protected readonly RepairStatus = RepairStatus;

  data: PagedResponse<Client> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

  newClient: ClientCreate = {
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };

  newClientForm: FormGroup;

  constructor(
    private clientManagementService: ClientManagementService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.newClientForm = this.formBuilder.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^\\d{10}$")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      address: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    });
  }

  ngOnInit(): void {

    this.newClientForm.reset();
    this.newClient = {address: "", email: "", firstName: "", lastName: "", phoneNumber: ""};

    this.clientManagementService.getClientList().subscribe(
      (data: PagedResponse<Client>) => {
        this.data = data;
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newClientForm.controls;
  }

  paginate(event: any) {
    this.clientManagementService.getClientPage(+event.page).subscribe(
      (data: PagedResponse<Client>) => {
        this.data = data;
      }
    );
  }

  cancelAddNewClient() {
    this.newClientForm.reset();
    this.modalService.dismissAll();
  }

  addNewClient() {
    this.newClient = {
      firstName: this.newClientForm.value['firstName'],
      lastName: this.newClientForm.value['lastName'],
      phoneNumber: this.newClientForm.value['phoneNumber'],
      email: this.newClientForm.value['email'],
      address: this.newClientForm.value['address']
    }
    this.clientManagementService.addClient(this.newClient).subscribe(
      {
        next: (() => {
          this.modalService.dismissAll();
          this.alertService.success("New client was added successfully!", {autoClose: true});
          this.ngOnInit();
        }),
        error: (() => {
          this.modalService.dismissAll();
          this.alertService.error("An error has occurred", {autoClose: true});
          this.ngOnInit();
        })
      }
    );
  }

  filter(dataTable: Table, event: Event | null) {
    if (event) {
      const element: HTMLInputElement = event?.target as HTMLInputElement;
      dataTable.filterGlobal(element.value, 'contains');
    }
  }

  clear(table: Table) {
    this.searchInput.nativeElement.value = '';
    table.clear();
  }
}
