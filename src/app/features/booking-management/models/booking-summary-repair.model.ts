import {RepairStatus} from "../../../shared/enums/repair-status-enum";

export interface BookingSummaryRepair {
  repairCost: number;
  repairType: string;
  repairDetails: string;
  repairStatus: RepairStatus;
}
