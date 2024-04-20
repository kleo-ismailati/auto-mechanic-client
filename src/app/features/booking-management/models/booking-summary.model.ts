import { RepairStatus } from '../../../shared/enums/repair-status-enum';
import { BookingSummaryRepair } from './booking-summary-repair.model';

export interface BookingSummary {
    firstName?: string;
    lastName?: string;
    autoModel?: string;
    autoType?: string;
    date?: Date;
    totalPrice?: string;
    status: RepairStatus;
    repairs?: BookingSummaryRepair[];
}
