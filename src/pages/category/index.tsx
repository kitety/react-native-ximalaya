import { useNavigation } from '@react-navigation/native';
import { useMount } from 'ahooks';
import { groupBy } from 'lodash-es';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { loadCategory } from '~/models/category';
import { ICategory } from '~/types/category';
import HeaderRightBtn from './headerRightBtn';
import CategoryItem from './item';

const Category = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { allCategories, myCategories } = useAppSelector((s) => s.category);
  useMount(() => {
    dispatch(loadCategory());
  });
  useMount(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onToggleEditing={onToggleEditing} />,
    });
  });

  const formattedCategories = useMemo(
    () => groupBy(allCategories, 'classify'),
    [allCategories],
  );
  const onToggleEditing = () => {
    dispatch({ type: 'category/toggleEditing' });
  };
  const renderItem = (item: ICategory) => {
    return <CategoryItem item={item} key={item.id} />;
  };

  return (
    <ScrollView className='flex-1 bg-[#f3f6f6]'>
      <View>
        <Text className='mb-2 ml-2 mt-[14px] text-base'>我的分类</Text>
        <View className='flex-row flex-wrap p-1'>
          {myCategories.map(renderItem)}
        </View>
      </View>
      <View>
        {Object.entries(formattedCategories).map(([key, cates]) => (
          <View key={key}>
            <Text className='mb-2 ml-2 mt-[14px] text-base'>{key}</Text>
            <View className='flex-row flex-wrap p-1'>
              {cates.map(renderItem)}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Category;
