import {RepairStatus} from "./repair-status-enum";

export interface RepairBookingView {
  id?: number;
  firstName?: string;
  lastName?: string;
  carModel?: string;
  carType?: string;
  date?: Date;
  totalPrice?: string;
  status: RepairStatus;
  repairs?: RepairView[];
}

export interface RepairView {
  repairCost: number;
}
