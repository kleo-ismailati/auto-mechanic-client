import {RepairStatus} from "../../../shared/enums/repair-status-enum";

export interface BookingItem {
  id?: number;
  firstName?: string;
  lastName?: string;
  autoModel?: string;
  autoType?: string;
  date?: Date;
  totalPrice?: string;
  status: RepairStatus;
  repairs?: BookingItemRepair[];
}

export interface BookingItemRepair {
  repairCost: number;
}
