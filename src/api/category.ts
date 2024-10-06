import axiosIns from '~/config/http';
import { ICategory } from '~/types/category';
import { IRes } from '~/types/http';

export function getCategories(): Promise<IRes<ICategory[]>> {
  return axiosIns.get(`/category`);
}
