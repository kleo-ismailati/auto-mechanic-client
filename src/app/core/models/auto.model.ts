import { Repair } from "./repair.model";

export interface Auto {

    id: number;
    autoType: string;
    autoModel: string;
    year: string;
    color: string;
    autoDescription: string;
    repairs?: Repair[];
    imageId?: string;
}
