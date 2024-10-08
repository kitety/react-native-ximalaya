import { FC } from 'react';
import { Image, Text, View } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import { IChannelItem } from '~/types/home';

interface IChannelItemProps {
  item: IChannelItem;
  onPress: (item: IChannelItem) => void;
}
const ChannelView: FC<IChannelItemProps> = ({ item, onPress }) => {
  const handlePress = () => {
    onPress?.(item);
  };
  return (
    <Touchable onPress={handlePress}>
      <View className='shadow-gray-500-700 m-2.5  flex-row rounded-lg bg-white p-2.5 shadow'>
        <Image
          className='mr-2.5 h-[100px] w-[100px] rounded-lg bg-[#dedede]'
          source={{ uri: item.image }}
        />
        <View className='flex-1'>
          <Text className='mb-2.5 text-base' numberOfLines={1}>
            {item.title}
          </Text>
          <Text className='mb-1 bg-[#f8f8f8] p-1' numberOfLines={2}>
            <Text>{item.remark}</Text>
          </Text>
          <View className='flex-1'></View>
          <View className='flex-row content-end'>
            <View className='mr-5 flex-row items-center'>
              <Icon name='icon-V' size={14} />
              <Text className='ml-1'>{item.played}</Text>
            </View>
            <View className='flex-row items-center'>
              <Icon name='icon-shengyin' size={14} />
              <Text className='ml-1'>{item.playing}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export default ChannelView;
