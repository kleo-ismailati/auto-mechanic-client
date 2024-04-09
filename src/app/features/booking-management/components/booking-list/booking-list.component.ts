import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BookingItem} from "../../models/booking-item.model";
import {Table} from "primeng/table";
import {BookingManagementService} from "../../booking-management.service";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Output() deleteBookingConfirmationEvent = new EventEmitter<number>();

  @Input() bookings!: PagedResponse<BookingItem>;

  protected readonly RepairStatus = RepairStatus;

  constructor(
    private bookingManagementService: BookingManagementService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

  changePage(event: any) {
    this.bookingManagementService.getBookingPage(+event.page).subscribe(
      (data: PagedResponse<BookingItem>) => {
        this.bookings = data;
      }
    );
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

  confirmDelete(id: number) {
    this.deleteBookingConfirmationEvent.emit(id);
  }
}
