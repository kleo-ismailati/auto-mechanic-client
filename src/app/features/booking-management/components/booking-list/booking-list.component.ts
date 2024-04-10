import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../../core/models/paged.response.model";
import {RepairStatus} from "../../../../shared/enums/repair-status-enum";
import {BookingItem} from "../../models/booking-item.model";
import {Table} from "primeng/table";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Output() deleteBooking = new EventEmitter<number>();
  @Output() switchToPage = new EventEmitter<number>();
  @Input() bookings!: PagedResponse<BookingItem>;

  protected readonly RepairStatus = RepairStatus;

  changePage(event: any) {
    this.switchToPage.emit(+event.page);
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
    this.deleteBooking.emit(id);
  }
}
