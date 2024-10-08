import Slider from '@react-native-community/slider';
import { Text, View } from 'react-native';
import { useAppSelector } from '~/hooks/state';
import { formatTime } from '~/utils/time';

const PlaySlider = () => {
  const { positionMillis, durationMillis } = useAppSelector((s) => s.player);
  const textClassName = 'text-white text-sm';
  return (
    <View className='mx-2'>
      <View className='flex flex-row items-center justify-center gap-1'>
        <Text className={textClassName}>{formatTime(positionMillis)}</Text>
        <Text className={textClassName}>{'/'}</Text>
        <Text className={textClassName}>{formatTime(durationMillis)}</Text>
      </View>
      <Slider
        className='h-10 w-full'
        maximumTrackTintColor='rgba(255,255,255,0.3)'
        maximumValue={durationMillis}
        minimumTrackTintColor='white'
        minimumValue={0}
        thumbTintColor='#333'
        value={positionMillis}
      />
    </View>
  );
};
export default PlaySlider;
