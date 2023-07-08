import {RepairStatus} from "./repair-status-enum";

export interface RepairBookingGuestView {
  firstName?: string;
  lastName?: string;
  carModel?: string;
  carType?: string;
  date?: Date;
  totalPrice?: string;
  status: RepairStatus;
  repairs?: RepairGuestView[];
}

export interface RepairGuestView {
  repairCost: number;
  repairType: string;
  repairDetails: string;
  repairStatus: RepairStatus;
}
