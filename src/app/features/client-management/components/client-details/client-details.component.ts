import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
    @Input() clientInfo!: Client;
    @Output() updateClient = new EventEmitter<Client>();

    updatedClient!: Client;

    isEdit: boolean = false;

    ngOnInit(): void {
        this.updatedClient = {
            id: this.clientInfo.id,
            address: this.clientInfo.address,
            email: this.clientInfo.email,
            firstName: this.clientInfo.firstName,
            lastName: this.clientInfo.lastName,
            phoneNumber: this.clientInfo.phoneNumber,
        };
    }

    enableEdit() {
        this.isEdit = true;
        this.updatedClient = {
            id: this.clientInfo.id,
            address: this.clientInfo.address,
            email: this.clientInfo.email,
            firstName: this.clientInfo.firstName,
            lastName: this.clientInfo.lastName,
            phoneNumber: this.clientInfo.phoneNumber,
        };
    }

    editClient() {
        this.isEdit = false;

        this.updateClient.emit(this.updatedClient);
    }

    cancel() {
        this.isEdit = false;
        this.ngOnInit();
    }
}
