import { Repair } from "./repair.model";

export interface Car {

    id: number;
    carType: string;
    carModel: string;
    year: string;
    color: string;
    carDescription: string;
    repairs?: Repair[];
}
