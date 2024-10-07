import { FC } from 'react';
import { Text, View } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import { IAlbumItem } from '~/types/album';

interface IItemProps {
  data: IAlbumItem;
  index: number;
  onPress: (data: IAlbumItem) => void;
}

const Item: FC<IItemProps> = ({ data, index, onPress }) => {
  return (
    <Touchable
      className='flex-row items-center border-b border-[#e3e3e3] p-5 '
      onPress={() => onPress(data)}>
      <Text className='text-sm font-bold text-[#838383]'>{index + 1}</Text>
      <View className='mx-6 flex-1'>
        <Text className='mb-4'>{data.title}</Text>
        <View className='flex-row items-center'>
          <View className='flex-row items-center'>
            <Icon color='#939393' name='icon-bofang' size={12} />
            <Text className='ml-1 text-sm text-[#939393]'>
              {data.playVolume}
            </Text>
          </View>
          <View className='ml-3 flex-row items-center'>
            <Icon color='#939393' name='icon-shijian' size={14} />
            <Text className='ml-1 text-sm text-[#939393]'>{data.duration}</Text>
          </View>
        </View>
      </View>
      <Text className='text-[#939393]'>{data.date}</Text>
    </Touchable>
  );
};

export default Item;
