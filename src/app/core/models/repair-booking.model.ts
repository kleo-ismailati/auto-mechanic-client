import {RepairStatus} from "./repair-status-enum";
import {NewRepair, Repair} from "./repair.model";

export interface RepairBooking {
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

export interface NewRepairBooking {
  autoId: number;
  clientId: number;
  repairs: NewRepair[];
}
