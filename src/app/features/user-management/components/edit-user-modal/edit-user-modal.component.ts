import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-edit-user-modal',
    templateUrl: './edit-user-modal.component.html',
    styleUrls: ['./edit-user-modal.component.css'],
})
export class EditUserModalComponent implements AfterViewInit {
    @ViewChild('cancelButton') cancelButton!: ElementRef;
    @Output() updateConfirmed = new EventEmitter<boolean>();

    constructor() {}

    cancel() {
        this.updateConfirmed.emit(false);
    }

    confirmUpdate() {
        this.updateConfirmed.emit(true);
    }

    ngAfterViewInit(): void {
        this.cancelButton.nativeElement.focus();
    }
}
