import { CarViewDto } from "./car-view-dto";

export interface ClientViewDto {

	id?: number;
    firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	carViewDto?: CarViewDto;

}
