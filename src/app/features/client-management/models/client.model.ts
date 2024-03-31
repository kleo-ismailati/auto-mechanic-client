import {Auto} from "./auto.model";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  autos?: Auto[];
}
