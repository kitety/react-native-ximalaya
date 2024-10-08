import { useNavigation } from '@react-navigation/native';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { ModalStackNavigation } from '~/navigator';
import { IAlbumItem } from '~/types/album';
import Item from './item';

const List = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ModalStackNavigation>();
  const { list } = useAppSelector((s) => s.album);
  const handleItemPress = (item: IAlbumItem, index: number) => {
    dispatch({
      type: 'player/setSongIds',
      payload: {
        songIds: list.map((item) => item.id),
      },
    });

    navigation.navigate('Detail', { id: item.id });
  };
  const renderItem = ({ item, index }: ListRenderItemInfo<IAlbumItem>) => {
    return (
      <Item
        data={item}
        index={index}
        key={`${item.id}.${index}`}
        onPress={() => {
          handleItemPress(item, index);
        }}
      />
    );
  };
  return (
    <FlatList<IAlbumItem>
      className='mb-6 bg-[#fff]'
      data={list}
      keyExtractor={(item, index) => `${item.id}.${index}`}
      renderItem={renderItem}
    />
  );
};

export default List;
