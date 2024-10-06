import { FC } from 'react';
import { Text, View } from 'react-native';
import { ICategory } from '~/types/category';
import { viewportWidth } from '~/utils';

interface ICategoryItem {
  item: ICategory;
  isEditing: boolean;
  selected: boolean;
}
const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
const CategoryItem: FC<ICategoryItem> = ({ item, isEditing, selected }) => {
  return (
    <View style={{ width: itemWidth }} className='h-12' key={item.id}>
      <View className='m-1 flex-1 flex-row items-center justify-center rounded bg-white'>
        <Text key={item.id}>{item.name}</Text>
      </View>
      {isEditing && (
        <View className='absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-lg bg-[#f86442]'>
          <Text className='leading-4 text-white'>{selected ? '-' : '+'}</Text>
        </View>
      )}
    </View>
  );
};

export default CategoryItem;
