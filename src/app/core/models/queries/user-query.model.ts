export interface UserQuery {
  page?: number;
  pageSize?: number;
  gender?: string;
  minAge?: number;
  maxAge?: number;
  sortBy?: string;
}
