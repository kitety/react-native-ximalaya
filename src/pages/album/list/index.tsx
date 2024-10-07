import { FlatList, Text } from 'react-native';
import { useAppSelector } from '~/hooks/state';
import { IAlbumItem } from '~/types/album';

const List = () => {
  const { list } = useAppSelector((s) => s.album);
  const renderItem = ({ item }: { item: IAlbumItem }) => {
    return <Text key={item.id}>{item.title}</Text>;
  };
  return (
    <FlatList<IAlbumItem>
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default List;
