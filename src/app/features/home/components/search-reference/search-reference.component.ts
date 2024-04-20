import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search-reference',
    templateUrl: './search-reference.component.html',
    styleUrls: ['./search-reference.component.css'],
})
export class SearchReferenceComponent implements OnInit {
    @Output() inputReferenceId = new EventEmitter<string>();

    referenceId: string = '';

    ngOnInit(): void {
        this.referenceId = '';
    }

    viewBooking() {
        if (this.referenceId && this.referenceId.length >= 30) {
            this.inputReferenceId.emit(this.referenceId);
            this.ngOnInit();
        }
    }
}
