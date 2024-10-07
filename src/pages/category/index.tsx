import { useNavigation } from '@react-navigation/native';
import { useMount } from 'ahooks';
import { groupBy } from 'lodash-es';
import { useEffect, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Touchable from '~/components/touchable';
import { myBaseCategories } from '~/const/model/category';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { loadCategory, toggleEditing } from '~/models/category';
import { ICategory } from '~/types/category';
import HeaderRightBtn from './headerRightBtn';
import CategoryItem from './item';

const Category = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { allCategories, myCategories, isEditing } = useAppSelector(
    (s) => s.category,
  );
  const selectedCategoryIds = myCategories.map((c) => c.id);
  const myBaseCategoryIds = myBaseCategories.map((c) => c.id);
  useMount(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onToggleEditing={onToggleEditing} />,
    });
    dispatch(loadCategory());
  });
  useEffect(() => {
    return () => {
      dispatch({ type: 'category/setState', payload: { isEditing: false } });
    };
  }, [dispatch]);

  const formattedCategories = useMemo(
    () => groupBy(allCategories, 'classify'),
    [allCategories],
  );
  const onToggleEditing = () => {
    dispatch(toggleEditing());
  };
  const onItemLongPress = () => {
    dispatch({ type: 'category/setState', payload: { isEditing: true } });
  };
  const onUnselectedItemPress = (item: ICategory) => {
    if (isEditing) {
      dispatch({
        type: 'category/setState',
        payload: { myCategories: [...myCategories, item] },
      });
    }
  };
  const onSelectedItemPress = (item: ICategory) => {
    if (isEditing) {
      dispatch({
        type: 'category/setState',
        payload: { myCategories: myCategories.filter((c) => c.id !== item.id) },
      });
    }
  };

  const renderSelectedItem = (item: ICategory) => {
    const disabled = myBaseCategoryIds.includes(item.id);
    return (
      <Touchable
        key={item.id}
        onLongPress={onItemLongPress}
        onPress={() => {
          if (!disabled) {
            onSelectedItemPress(item);
          }
        }}>
        <CategoryItem
          selected
          disabled={disabled}
          isEditing={isEditing}
          item={item}
        />
      </Touchable>
    );
  };
  const renderUnselectedItem = (item: ICategory) => {
    return (
      <Touchable
        key={item.id}
        onLongPress={onItemLongPress}
        onPress={() => onUnselectedItemPress(item)}>
        <CategoryItem isEditing={isEditing} item={item} selected={false} />
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
              {cates
                .filter((c) => !selectedCategoryIds.includes(c.id))
                .map(renderUnselectedItem)}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Category;
