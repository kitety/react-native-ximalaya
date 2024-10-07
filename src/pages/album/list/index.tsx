import { useNavigation } from '@react-navigation/native';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useAppSelector } from '~/hooks/state';
import { ModalStackNavigation } from '~/navigator';
import { IAlbumItem } from '~/types/album';
import Item from './item';

const List = () => {
  const navigation = useNavigation<ModalStackNavigation>();
  const { list } = useAppSelector((s) => s.album);
  const renderItem = ({ item, index }: ListRenderItemInfo<IAlbumItem>) => {
    return (
      <Item
        data={item}
        index={index}
        key={item.id}
        onPress={() => {
          navigation.navigate('Detail');
        }}
      />
    );
  };
  return (
    <FlatList<IAlbumItem>
      className='mb-6 bg-[#fff]'
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default List;
