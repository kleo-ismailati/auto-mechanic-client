import {RepairStatus} from "../../../shared/enums/repair-status-enum";

export interface RepairBookingView {
  id?: number;
  firstName?: string;
  lastName?: string;
  autoModel?: string;
  autoType?: string;
  date?: Date;
  totalPrice?: string;
  status: RepairStatus;
  repairs?: RepairView[];
}

export interface RepairView {
  repairCost: number;
}
