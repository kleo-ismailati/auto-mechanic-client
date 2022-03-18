import { RepairViewDto } from "./repair-view-dto";

export interface CarViewDto {

    id?: number;
    carType: string;
    carModel: string;
    year: string;
    color: string;
    carDescription: string;
    repairViewDtoList?: RepairViewDto[];
}
