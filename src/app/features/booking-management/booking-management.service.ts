import {Injectable} from '@angular/core';

@Injectable()
export class BookingManagementService {
  private _isAddingRepair: boolean = false;

  constructor() {
  }

  get isAddingRepair(): boolean {
    return this._isAddingRepair;
  }

  set isAddingRepair(value: boolean) {
    this._isAddingRepair = value;
  }


}
