import { RepairStatus } from '../../../shared/enums/repair-status-enum';
import { Repair } from '../../../shared/models/repair.model';

export interface Booking {
    id?: number;
    firstName?: string;
    lastName?: string;
    autoModel?: string;
    autoType?: string;
    date?: Date;
    totalPrice?: string;
    status: RepairStatus;
    repairs?: Repair[];
}
