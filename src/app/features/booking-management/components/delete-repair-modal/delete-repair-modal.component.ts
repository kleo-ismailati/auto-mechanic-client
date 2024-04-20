import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-delete-repair-modal',
    templateUrl: './delete-repair-modal.component.html',
    styleUrls: ['./delete-repair-modal.component.css'],
})
export class DeleteRepairModalComponent implements AfterViewInit {
    @ViewChild('cancelButton') cancelButton!: ElementRef;
    @Output() confirmRepairDelete = new EventEmitter<boolean>();

    deleteRepair() {
        this.confirmRepairDelete.emit(true);
    }

    cancelDeleteRepair() {
        this.confirmRepairDelete.emit(false);
    }

    ngAfterViewInit(): void {
        this.cancelButton.nativeElement.focus();
    }
}
