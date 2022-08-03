import { Car } from "./car.model";
import { Client } from "./client.model";

export interface RepairBooking {

    id?: number;
    client?: Client;
    car?: Car;
    date: Date;
    totalPrice: string;
    status: string;

}
