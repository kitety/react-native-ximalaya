export interface IRes<T> {
  data: T;
  status: number;
  msg: string;
}
