import { FlatList, Image, Text, View } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { fetchGuess } from '~/models/home';
import { GuessItem } from '~/types/home';

const Guess = () => {
  const dispatch = useAppDispatch();
  const { guesses } = useAppSelector((s) => s.home);
  const handleRefresh = () => {
    dispatch(fetchGuess());
  };
  const renderItem = ({ item }: { item: GuessItem }) => {
    return (
      <Touchable
        className='mx-2.5 my-1.5 flex-1'
        onPress={() => {
          console.log('item', item);
        }}>
        <Image source={{ uri: item.image }} className='h-24 w-full rounded' />
        <Text className='mt-2.5' numberOfLines={2}>
          {item.title}
        </Text>
      </Touchable>
    );
  };
  return (
    <View className='m-4 rounded-lg bg-white'>
      <View className='flex-row items-center justify-between border-b border-[#efefef] p-4'>
        <View className='flex-row items-center'>
          <Icon name='icon-qunfengcainixihuanxian' />
          <Text className='ml-1.5 text-base font-medium text-[#333]'>
            猜你喜欢
          </Text>
        </View>
        <View className='flex-row items-center'>
          <Text className='mr-1.5 text-[#6f6f6f]'>更多</Text>
          <Icon name='icon-qunfengcainixihuanxian' />
        </View>
      </View>
      <FlatList
        className='p-2.5'
        numColumns={3}
        data={guesses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Touchable
        className='flex-row items-center justify-center p-2.5'
        onPress={() => {
          handleRefresh();
        }}>
        <Icon name='icon-huanyipi' size={16} color='#ff0000' />
        <Text className='mb-1 ml-1.5 text-[#6f6f6f]'>换一批</Text>
      </Touchable>
    </View>
  );
};

export default Guess;
