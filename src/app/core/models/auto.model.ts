import { Repair } from "./repair.model";

export interface Auto {

    id: number;
    autoType: string;
    autoModel: string;
    year: string;
    color: string;
    autoDescription: string;
    thumbnail?: string | any;
    repairs?: Repair[];
    imageId?: string;
}
