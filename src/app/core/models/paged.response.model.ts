export interface PagedResponse<T> {
    pageNo: number
    size: number
    total: number
    result: T[]
}
