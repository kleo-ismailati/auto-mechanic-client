export interface PagedResponse<T> {
    page: number;
    size: number;
    total:number;
    result: T[];
  }