import { FC } from 'react';
import { Text, View } from 'react-native';
import { ICategory } from '~/types/category';
import { viewportWidth } from '~/utils';

interface ICategoryItem {
  item: ICategory;
}
const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const CategoryItem: FC<ICategoryItem> = ({ item }) => {
  return (
    <View style={{ width: itemWidth }} className='h-12' key={item.id}>
      <View className='m-1 flex-1 flex-row items-center justify-center rounded bg-white'>
        <Text key={item.id}>{item.name}</Text>
      </View>
    </View>
  );
};

export default CategoryItem;
