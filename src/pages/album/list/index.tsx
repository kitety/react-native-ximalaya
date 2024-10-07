import { FlatList, ListRenderItemInfo } from 'react-native';
import { useAppSelector } from '~/hooks/state';
import { IAlbumItem } from '~/types/album';
import Item from './item';

const List = () => {
  const { list } = useAppSelector((s) => s.album);
  const renderItem = ({ item, index }: ListRenderItemInfo<IAlbumItem>) => {
    return <Item data={item} index={index} key={item.id} onPress={() => {}} />;
  };
  return (
    <FlatList<IAlbumItem>
      className='bg-[#fff]'
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default List;
