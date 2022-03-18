import { ClientViewDto } from "./client-view-dto";

export interface RepairBookingViewDto {

    id?: number;
    clientViewDto?: ClientViewDto
    date: Date;
    totalPrice: string;
    status: string;

}
