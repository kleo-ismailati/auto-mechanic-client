import { CarDto } from "./car-dto";

export interface ClientDto {

	id?: number;
    firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	carDto?: CarDto;

}
