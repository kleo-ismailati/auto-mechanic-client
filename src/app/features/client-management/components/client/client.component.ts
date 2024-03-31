import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Client} from "../../models/client.model";
import {ApiService} from "../../../../core/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {Table} from "primeng/table";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  breadcrumbParentsList = [
    {
      link: "/clients",
      label: "Clients",
    }
  ];

  data: Client = {
    id: 0,
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };

  isEdit: boolean = false;

  newAuto = {
    autoType: "",
    autoDescription: "",
    autoModel: "",
    color: "",
    year: ""
  }

  newAutoForm: FormGroup;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.newAutoForm = this.formBuilder.group({
      autoModel: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      autoType: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      color: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      year: new FormControl("", [
        Validators.required,
        Validators.pattern("^(19|20)\\d{2}$")
      ]),
      autoDescription: new FormControl("")
    })
  }

  ngOnInit(): void {
    this.newAuto = {autoType: "", autoDescription: "", autoModel: "", color: "", year: ""}
    this.newAutoForm.reset();
    let id = this.route.snapshot.paramMap.get('id');
    this.api.get(environment.clients_url + '/' + id).subscribe(
      (data: Client) => {
        this.data = data;
        for (let auto of this.data.autos!) {
          if (auto.thumbnail) {
            auto.thumbnail.data = this.sanitizer.bypassSecurityTrustUrl(`data:${auto.thumbnail.type};base64,` + auto.thumbnail.data);
          }
        }
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newAutoForm.controls;
  }

  enableEdit() {
    this.isEdit = true;
  }

  editClient() {
    let data: Client = {
      id: this.data.id,
      address: this.data.address,
      email: this.data.email,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      phoneNumber: this.data.phoneNumber
    };
    let id = this.route.snapshot.paramMap.get('id');
    this.api.put(environment.clients_url + '/' + id, data).subscribe(
      () => {
        this.isEdit = false;
        this.alertService.success("Client was updated successfully!", {autoClose: true});
        this.ngOnInit();
      }
    );
  }

  submitNewAuto() {
    this.newAuto = {
      autoModel: this.newAutoForm.value['autoModel'],
      autoType: this.newAutoForm.value['autoType'],
      color: this.newAutoForm.value['color'],
      autoDescription: this.newAutoForm.value['autoDescription'],
      year: this.newAutoForm.value['year']
    }
    let id = this.route.snapshot.paramMap.get('id');
    this.api.post(`${environment.clients_url}/${id}${environment.add_auto_url}`, this.newAuto).subscribe({
        next: (() => {
          this.modalService.dismissAll();
          this.alertService.success("New auto was added successfully!", {autoClose: true});
          this.ngOnInit();
        }),
        error: (() => {
          this.modalService.dismissAll();
          this.alertService.error("An error has occurred", {autoClose: true});
          this.ngOnInit();
        })
      }
    )
  }

  cancelNewAuto() {
    this.modalService.dismissAll();
    this.newAuto = {
      autoType: "",
      autoDescription: "",
      autoModel: "",
      color: "",
      year: ""
    }
    this.newAutoForm.reset();
  }

  deleteAuto(id: number) {
    this.api.delete(environment.autos_url + '/' + id).subscribe(
      () => {
        this.ngOnInit();
      }
    )
  }

  cancel() {
    this.isEdit = false;
    this.ngOnInit();
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
