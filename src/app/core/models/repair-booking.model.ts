import { Car } from "./car.model";
import { Client } from "./client.model";
import {RepairStatus} from "./repair-status-enum";
import {NewRepair, Repair} from "./repair.model";

export interface RepairBooking {

  id?: number;
  client?: Client;
  car?: Car;
  date?: Date;
  totalPrice?: string;
  status: RepairStatus;
  repairs?: Repair[];
}
export interface NewRepairBooking {
  carId: number;
  clientId: number;
  repairs: NewRepair[];
}
