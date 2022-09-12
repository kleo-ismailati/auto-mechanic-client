import { Car } from "./car.model";

export interface Client {

	id?: number;
  firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	address: string;
	car?: Car;

}
