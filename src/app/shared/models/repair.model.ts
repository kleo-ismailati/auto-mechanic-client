import {RepairStatus} from "../enums/repair-status-enum";

export interface Repair {
  id: number;
  repairType: string;
  repairCost: number;
  repairDetails: string;
  repairStatus: RepairStatus;
  autoId?: string;
}

export interface NewRepair {
  repairType: string;
  repairCost: number;
  repairDetails: string;
}
