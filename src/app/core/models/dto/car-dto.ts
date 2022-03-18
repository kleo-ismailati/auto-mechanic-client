import { RepairDto } from "./repair-dto";

export interface CarDto {

    id?: number;
    carType: string;
    carModel: string;
    year: string;
    color: string;
    carDescription: string;
    repairDtoList?: RepairDto[];
}
