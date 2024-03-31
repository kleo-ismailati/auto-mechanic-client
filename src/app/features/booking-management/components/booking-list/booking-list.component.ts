import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {ApiService} from "../../../../core/services/api.service";
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {AlertService} from "../../../../core/services/alert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BookingItem} from "../../models/booking-item.model";
import {Table} from "primeng/table";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  protected readonly RepairStatus = RepairStatus;

  data: PagedResponse<BookingItem> = {
    page: 0,
    size: 0,
    total: 0,
    result: []
  };

  deleteId = -1;

  constructor(
    private api: ApiService,
    private alertService: AlertService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.deleteId = -1;

    this.api.get(environment.bookings_url).subscribe(
      (data: PagedResponse<BookingItem>) => {
        this.data = data;
      }
    );
  }

  delete(): void {
    this.modalService.dismissAll();
    this.api.delete(`${environment.bookings_url}/${this.deleteId}`).subscribe(
      () => {
        this.alertService.warn("Booking with id " + this.deleteId + " deleted!", {autoClose: true})
        this.ngOnInit();
      }
    )
  }

  paginate(event: any) {
    this.api.get(`${environment.bookings_url}?page=${event.page}`).subscribe(
      (data: PagedResponse<BookingItem>) => {
        this.data = data;
      }
    );
  }

  confirmDelete(id: number | undefined) {
    this.deleteId = id || -1;
  }

  cancelDelete() {
    this.modalService.dismissAll();
    this.deleteId = -1;
  }

  getSeverity(repairStatus: string) {
    switch (repairStatus) {
      case 'Done':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'To Be Done':
        return 'warning';
      default:
        return 'danger';
    }
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
