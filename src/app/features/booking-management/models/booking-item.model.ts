import { RepairStatus } from '../../../shared/enums/repair-status-enum'
import { BookingItemRepair } from './booking-item-repair.model'

export interface BookingItem {
    id?: number
    firstName?: string
    lastName?: string
    autoModel?: string
    autoType?: string
    date?: Date
    totalPrice?: string
    status: RepairStatus
    repairs?: BookingItemRepair[]
}
