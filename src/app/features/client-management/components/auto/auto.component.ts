import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Auto} from "../../models/auto.model";
import {BookingCreate} from "../../../booking-management/models/booking-create.model";
import {AlertService} from "../../../../core/services/alert.service";
import {HttpHeaders} from "@angular/common/http";
import {ClientManagementService} from "../../client-management.service";
import {Breadcrumb} from "../../../../shared/models/breadcrumb.model";

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  breadcrumbParentsList: Breadcrumb[] = [
    {
      link: "/clients",
      label: "Clients",
    },
    {
      link: "/clients/0",
      label: ""
    }
  ];

  data: Auto = {
    autoDescription: "",
    autoModel: "",
    autoType: "",
    color: "",
    id: 0,
    year: "",
    imageId: "",
  }
  headers: HttpHeaders = new HttpHeaders().set('Accept', 'image/*');
  imageToShow: any;
  selectedFile: File | null = null;

  isEdit: boolean = false;
  isAddBooking: boolean = false;
  newBooking: BookingCreate = {
    autoId: 0,
    clientId: 0,
    repairs: [
      {
        repairCost: 0,
        repairDetails: '',
        repairType: ''
      }
    ]
  };

  constructor(
    private clientManagementService: ClientManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')!;
    let autoId: string = this.route.snapshot.paramMap.get('autoId')!;
    this.clientManagementService.getAuto(+autoId).subscribe(
      (data: Auto) => {
        this.data = data;
        if (this.data.imageId != null) {
          this.clientManagementService.getImage(this.data.imageId, this.headers).subscribe(
            (image) => {
              this.createImageFromBlob(image);
            }
          );
        }
      }
    );

    this.breadcrumbParentsList[1] =
      {
        link: `/clients/${id}`,
        label: `Client ${id}`
      };
  }

  submit() {
    let data: Auto = {
      id: this.data.id,
      autoType: this.data.autoType,
      autoDescription: this.data.autoDescription,
      autoModel: this.data.autoModel,
      year: this.data.year,
      color: this.data.color
    };
    let autoId: string = this.route.snapshot.paramMap.get('autoId')!;
    this.clientManagementService.updateAuto(+autoId, data).subscribe(
      () => {
        this.isEdit = false;
        this.alertService.success("Auto was updated successfully!", {autoClose: true});
        this.ngOnInit();
      }
    );
  }

  enableEdit() {
    this.isEdit = true;
  }

  cancel() {
    this.isEdit = false;
    this.ngOnInit();
  }

  addNewBooking() {
    this.isAddBooking = true;
  }

  lastOfList(idx: number) {
    return (this.newBooking.repairs?.length == idx + 1);
  }

  addOtherRepair() {
    this.newBooking.repairs?.push(
      {
        repairCost: 0,
        repairDetails: '',
        repairType: ''
      }
    )
  }

  cancelNewBooking() {
    this.resetBooking();
    this.isAddBooking = false;
  }

  resetBooking() {
    this.newBooking = {
      autoId: 0,
      clientId: 0,
      repairs: [
        {
          repairCost: 0,
          repairDetails: '',
          repairType: ''
        }
      ]
    };
  }

  submitNewBooking() {
    let id: string = this.route.snapshot.paramMap.get('id')!;
    let autoId: string = this.route.snapshot.paramMap.get('autoId')!;
    if (id != null && autoId != null) {
      this.newBooking.clientId = Number(id);
      this.newBooking.autoId = Number(autoId);
      this.clientManagementService.createBooking(this.newBooking).subscribe(
        () => {
          this.isAddBooking = false;
          this.alertService.success("Booking was added successfully! Redirecting to Bookings...",
            {autoClose: true, keepAfterRouteChange: true});
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          this.resetBooking();
          setTimeout(() => {
            this.router.navigate(['bookings']).then(r => r);
          }, 3000)
        }
      )
    }
    this.isAddBooking = false;
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      let autoId: string = this.route.snapshot.paramMap.get('autoId')!;
      this.clientManagementService.setImageForAuto(+autoId, formData).subscribe(
        {
          next: () => {
            this.isEdit = false;
            this.alertService.success("Image was changed successfully!",
              {autoClose: true, keepAfterRouteChange: false});
            this.ngOnInit();
          },
          error: () => {
            this.isEdit = false;
            this.alertService.error("Image could not be changed!",
              {autoClose: true, keepAfterRouteChange: false});
            this.ngOnInit();
          }
        }
      );
    }
  }
}
