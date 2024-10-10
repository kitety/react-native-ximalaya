import { useReactive } from 'ahooks';
import { FlatList, Image, ListRenderItemInfo, Text, View } from 'react-native';
import realm, { IProgram, ProgramDocument } from '~/config/realm';

const Listen = () => {
  const state = useReactive({
    programs: realm.objects<IProgram>(ProgramDocument.schema.name),
  });
  const renderItem = ({ item }: ListRenderItemInfo<IProgram>) => {
    return (
      <View className='mx-2.5 flex-row border-b border-b-[#ccc]'>
        <Image
          className='m-1 h-16 w-16 rounded'
          source={{ uri: item.thumbnailUrl }}
        />
        <Text>{item.title}</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={state.programs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default Listen;
