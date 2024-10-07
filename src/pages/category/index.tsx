import { useNavigation } from '@react-navigation/native';
import { useMount } from 'ahooks';
import { groupBy } from 'lodash-es';
import { useCallback, useEffect, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DragSortableView } from 'react-native-drag-sort';
import Touchable from '~/components/touchable';
import { myBaseCategories } from '~/const/model/category';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { loadCategory, toggleEditing } from '~/models/category';
import { ICategory } from '~/types/category';
import HeaderRightBtn from './headerRightBtn';
import CategoryItem, {
  itemHeight,
  itemMargin,
  itemWidth,
  parentWidth,
} from './item';

const Category = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { allCategories, myCategories, isEditing } = useAppSelector(
    (s) => s.category,
  );
  const selectedCategoryIds = myCategories.map((c) => c.id);
  const myBaseCategoryIds = myBaseCategories.map((c) => c.id);
  useMount(() => {
    dispatch(loadCategory());
  });
  useEffect(() => {
    return () => {
      dispatch({ type: 'category/setState', payload: { isEditing: false } });
    };
  }, [dispatch]);

  const onToggleEditing = useCallback(() => {
    dispatch(toggleEditing());
    if (isEditing) {
      navigation.goBack();
    }
  }, [dispatch, isEditing, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightBtn
          isEditing={isEditing}
          onToggleEditing={onToggleEditing}
        />
      ),
    });
  }, [isEditing, navigation, onToggleEditing]);

  const formattedCategories = useMemo(
    () => groupBy(allCategories, 'classify'),
    [allCategories],
  );

  const onItemLongPress = () => {
    dispatch({ type: 'category/setState', payload: { isEditing: true } });
  };
  // render unselected item
  const onUnselectedItemPress = (item: ICategory) => {
    if (isEditing) {
      dispatch({
        type: 'category/setState',
        payload: { myCategories: [...myCategories, item] },
      });
    }
  };
  // render selected item
  const onSelectedItemPress = (item: ICategory) => {
    const disabled = myBaseCategoryIds.includes(item.id);
    if (isEditing && !disabled) {
      dispatch({
        type: 'category/setState',
        payload: { myCategories: myCategories.filter((c) => c.id !== item.id) },
      });
    }
  };
  // sort change
  const onSortDataChange = (data: ICategory[]) => {
    dispatch({
      type: 'category/setState',
      payload: { myCategories: data },
    });
  };

  const renderSelectedItem = (item: ICategory) => {
    const disabled = myBaseCategoryIds.includes(item.id);
    return (
      <CategoryItem
        selected
        disabled={disabled}
        isEditing={isEditing}
        item={item}
        key={item.id}
      />
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
          <DragSortableView
            childrenHeight={itemHeight}
            childrenWidth={itemWidth}
            dataSource={myCategories}
            fixedItems={[0, 1]}
            keyExtractor={(item) => item.id.toString()}
            marginChildrenTop={itemMargin}
            parentWidth={parentWidth}
            renderItem={renderSelectedItem}
            sortable={isEditing}
            onDataChange={onSortDataChange}
            onClickItem={(_, item: ICategory) => {
              onSelectedItemPress(item);
            }}
          />
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
