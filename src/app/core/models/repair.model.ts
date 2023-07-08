import {RepairStatus} from "./repair-status-enum";

export interface Repair {
  id: number;
  repairType: string;
  repairCost : number;
  repairDetails : string;
  repairStatus: RepairStatus;
  carId?: string;
}
export interface NewRepair {
  repairType: string;
  repairCost: number;
  repairDetails: string;
}
