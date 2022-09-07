import {RepairStatus} from "./repair-status-enum";

export interface Repair {

  id: number;
  repairType: string;
  repairCost : string;
  repairDetails : string;
  repairStatus : RepairStatus;
  carId?: string;
}
