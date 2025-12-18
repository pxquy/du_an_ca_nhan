export interface IApiResponse<T> {
  data: T;
  message: string;
}

export interface IResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
}
