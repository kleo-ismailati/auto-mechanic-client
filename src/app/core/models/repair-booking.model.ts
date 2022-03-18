import { Client } from "./client.model";

export interface RepairBooking {

    id?: number;
    client?: Client
    date: Date;
    totalPrice: string;
    status: string;

}
