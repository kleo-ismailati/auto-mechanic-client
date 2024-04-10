import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Auto} from "../../models/auto.model";

@Component({
  selector: 'app-auto-list',
  templateUrl: './auto-list.component.html',
  styleUrls: ['./auto-list.component.css']
})
export class AutoListComponent {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Input() autos!: Auto[];
  @Output() addingAuto = new EventEmitter<boolean>();

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

  addAuto() {
    this.addingAuto.emit(true);
  }
}
