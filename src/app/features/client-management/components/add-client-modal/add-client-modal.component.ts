import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ClientCreate } from '../../models/client-create.model';

@Component({
    selector: 'app-add-client-modal',
    templateUrl: './add-client-modal.component.html',
    styleUrls: ['./add-client-modal.component.css'],
})
export class AddClientModalComponent implements OnInit, AfterViewInit {
    @ViewChild('firstName') firstName!: ElementRef;
    @Output() addClient = new EventEmitter<ClientCreate | null>();

    newClientForm: FormGroup;

    newClient: ClientCreate = {
        address: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    };

    constructor(private formBuilder: FormBuilder) {
        this.newClientForm = this.formBuilder.group({
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
            ]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
            ]),
            phoneNumber: new FormControl('', [
                Validators.required,
                Validators.pattern('^\\d{10}$'),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100),
            ]),
        });
    }

    ngOnInit(): void {
        this.newClientForm.reset();
        this.newClient = {
            address: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        };
    }

    get f(): { [key: string]: AbstractControl } {
        return this.newClientForm.controls;
    }

    cancelAddNewClient() {
        this.newClientForm.reset();
        this.addClient.emit(null);
    }

    addNewClient() {
        this.newClient = {
            firstName: this.newClientForm.value['firstName'],
            lastName: this.newClientForm.value['lastName'],
            phoneNumber: this.newClientForm.value['phoneNumber'],
            email: this.newClientForm.value['email'],
            address: this.newClientForm.value['address'],
        };
        this.addClient.emit(this.newClient);
        this.ngOnInit();
    }

    ngAfterViewInit(): void {
        this.firstName.nativeElement.focus();
    }
}
