export interface RepairDto {

    id?: number;
    repairType: string;
    repairCost : string;
	repairDetails : string;
	repairStatus : string;
    carId?: string;
}
