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
        className='flex-1 my-1.5 mx-2.5'
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
    <View className='bg-white rounded-lg m-4'>
      <View className='flex-row justify-between items-center p-4 border-b border-[#efefef]'>
        <View className='flex-row items-center'>
          <Icon name='icon-qunfengcainixihuanxian' />
          <Text className='text-[#333] text-base font-medium ml-1.5'>
            猜你喜欢
          </Text>
        </View>
        <View className='flex-row items-center'>
          <Text className='text-[#6f6f6f] mr-1.5'>更多</Text>
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
        <Text className='text-[#6f6f6f] ml-1.5 mb-1'>换一批</Text>
      </Touchable>
    </View>
  );
};

export default Guess;
