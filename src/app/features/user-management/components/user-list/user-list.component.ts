import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { User } from '../../models/user.model';
import { UserSession } from '../../models/user-session.model';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    @Output() showAddUser = new EventEmitter<boolean>();
    @Input() users!: User[];
    @Input() loggedUser!: UserSession;

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

    showAddUserModal() {
        this.showAddUser.emit(true);
    }
}
