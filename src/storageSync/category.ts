import { getCategories } from '~/api/category';

export const allCategories = async () => {
  const res = await getCategories();
  return res.data;
};
export const myCategories = () => {
  return null;
};
