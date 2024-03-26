import {RepairStatus} from "../../../shared/enums/repair-status-enum";

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

export interface BookingSummaryRepair {
  repairCost: number;
  repairType: string;
  repairDetails: string;
  repairStatus: RepairStatus;
}
