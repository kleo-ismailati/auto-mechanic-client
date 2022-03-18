import { ClientDto } from "./client-dto";

export interface RepairBookingDto {

    id?: number;
    clientDto?: ClientDto
    date: Date;
    totalPrice: string;
    status: string;

}
