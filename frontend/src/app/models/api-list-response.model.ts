export interface ApiListResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  page: number;
  pageSize: number;
}
