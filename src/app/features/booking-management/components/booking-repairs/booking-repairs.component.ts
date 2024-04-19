import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RepairStatus } from '../../../../shared/enums/repair-status-enum'
import { Repair } from '../../../../shared/models/repair.model'
import { HelperService } from '../../../../core/utilities/helper.service'

@Component({
    selector: 'app-booking-repairs',
    templateUrl: './booking-repairs.component.html',
    styleUrls: ['./booking-repairs.component.css'],
})
export class BookingRepairsComponent implements OnInit {
    @Input() repairs!: Repair[]
    @Output() deleteRepairById = new EventEmitter<number>()
    @Output() updateRepair = new EventEmitter<Repair>()

    protected readonly repairStatus = RepairStatus
    repairStatusKeys: number[] = []

    repairEditId: number = -1
    repairDeleteId: number = -1

    updatedRepair!: Repair

    constructor(private helperService: HelperService) {
        this.repairStatusKeys = this.helperService.getEnumKeysArray(
            this.repairStatus
        )
    }

    ngOnInit(): void {
        this.repairEditId = -1
    }

    enableRepairEdit(repair: Repair) {
        if (this.repairEditId == -1) {
            this.repairEditId = repair.id
            this.updatedRepair = { ...repair }
        }
    }

    isRepairEdit(id: number): boolean {
        return id == this.repairEditId
    }

    cancel() {
        this.ngOnInit()
    }

    confirmDeleteRepair(id: number) {
        this.repairDeleteId = id
        this.deleteRepairById.emit(id)
    }

    submitRepair(updatedRepair: Repair) {
        this.updateRepair.emit(updatedRepair)
        this.ngOnInit()
    }
}
