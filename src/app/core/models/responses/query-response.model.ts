export interface QueryResponse<T> {
  totalItems: number;
  results: T[];
}
