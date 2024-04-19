import { BookingItemRepair } from './booking-item-repair.model'

export interface BookingTableItem {
    id: number
    firstName: string
    lastName: string
    autoModel: string
    autoType: string
    date: string
    totalPrice: string
    status: string
    repairs: BookingItemRepair[]
}
