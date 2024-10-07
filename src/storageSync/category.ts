import { getCategories } from '~/api/category';
import { myBaseCategories } from '~/const/model/category';

export const allCategories = async () => {
  const res = await getCategories();
  return res.data;
};
export const myCategories = () => {
  return myBaseCategories;
};
