import { RepairCreate } from '../../../shared/models/repair.model'

export interface BookingCreate {
    autoId: number
    clientId: number
    repairs: RepairCreate[]
}
