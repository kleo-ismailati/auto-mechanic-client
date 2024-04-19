import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core'
import { PagedResponse } from '../../../../core/models/paged.response.model'
import { Table } from 'primeng/table'
import { ClientItem } from '../../models/client-item.model'

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

    @Output() switchToPage = new EventEmitter<number>()
    @Output() addingClient = new EventEmitter<boolean>()
    @Input() clients!: PagedResponse<ClientItem>

    changePage(event: any) {
        this.switchToPage.emit(+event.page)
    }

    filter(dataTable: Table, event: Event | null) {
        if (event) {
            const element: HTMLInputElement = event?.target as HTMLInputElement
            dataTable.filterGlobal(element.value, 'contains')
        }
    }

    clear(table: Table) {
        this.searchInput.nativeElement.value = ''
        table.clear()
    }

    showAddClientModal() {
        this.addingClient.emit(true)
    }
}
