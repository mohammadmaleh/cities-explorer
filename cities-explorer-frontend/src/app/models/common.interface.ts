export interface Pagination {
  page: number;
  limit: number;
  total: number;
}
export interface PaginatedResponse<T> extends Pagination {
  data: T[];
}
