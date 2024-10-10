import { useReactive } from 'ahooks';
import { FlatList, Image, ListRenderItemInfo, Text, View } from 'react-native';
import Touchable from '~/components/touchable';
import realm, { IProgram, ProgramDocument } from '~/config/realm';

const Listen = () => {
  const state = useReactive({
    programs: realm.objects<IProgram>(ProgramDocument.schema.name),
  });
  console.log('state.', state.programs);
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
  const footerComponent = () => {
    return (
      <Touchable
        onPress={() => {
          // 从realm中获取所有数据
          state.programs = realm.objects<IProgram>(ProgramDocument.schema.name);
        }}>
        <Text>123</Text>
      </Touchable>
    );
  };
  return (
    <FlatList
      data={state.programs}
      keyExtractor={(item) => item.id}
      ListFooterComponent={footerComponent}
      renderItem={renderItem}
    />
  );
};

export default Listen;
