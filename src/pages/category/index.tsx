import { useNavigation } from '@react-navigation/native';
import { useMount } from 'ahooks';
import { groupBy } from 'lodash-es';
import { useEffect, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Touchable from '~/components/touchable';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { loadCategory } from '~/models/category';
import { ICategory } from '~/types/category';
import HeaderRightBtn from './headerRightBtn';
import CategoryItem from './item';

const Category = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { allCategories, myCategories, isEditing } = useAppSelector(
    (s) => s.category,
  );
  useMount(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onToggleEditing={onToggleEditing} />,
    });
  });
  useEffect(() => {
    dispatch(loadCategory());
    return () => {
      dispatch({ type: 'category/setState', payload: { isEditing: false } });
    };
  }, [dispatch]);

  const formattedCategories = useMemo(
    () => groupBy(allCategories, 'classify'),
    [allCategories],
  );
  const onToggleEditing = () => {
    dispatch({ type: 'category/toggleEditing' });
  };
  const onItemLongPress = () => {
    dispatch({ type: 'category/setState', payload: { isEditing: true } });
  };
  const renderSelectedItem = (item: ICategory) => {
    return (
      <Touchable onLongPress={onItemLongPress} key={item.id}>
        <CategoryItem item={item} isEditing={isEditing} selected />
      </Touchable>
    );
  };
  const renderUnselectedItem = (item: ICategory) => {
    return (
      <Touchable onLongPress={onItemLongPress} key={item.id}>
        <CategoryItem item={item} isEditing={isEditing} selected={false} />
      </Touchable>
    );
  };

  return (
    <ScrollView className='flex-1 bg-[#f3f6f6]'>
      <View>
        <Text className='mb-2 ml-2 mt-[14px] text-base'>我的分类</Text>
        <View className='flex-row flex-wrap p-1'>
          {myCategories.map(renderSelectedItem)}
        </View>
      </View>
      <View>
        {Object.entries(formattedCategories).map(([key, cates]) => (
          <View key={key}>
            <Text className='mb-2 ml-2 mt-[14px] text-base'>{key}</Text>
            <View className='flex-row flex-wrap p-1'>
              {cates.map(renderUnselectedItem)}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Category;
