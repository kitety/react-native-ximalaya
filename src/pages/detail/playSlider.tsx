import Slider from '@react-native-community/slider';
import { useThrottleFn } from 'ahooks';
import { Text, View } from 'react-native';
import soundManager from '~/config/sound';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { formatTime } from '~/utils/time';

const PlaySlider = () => {
  const dispatch = useAppDispatch();
  const { positionMillis, durationMillis } = useAppSelector((s) => s.player);
  const textClassName = 'text-white text-sm';

  const { run: onValueChange } = useThrottleFn(
    (value: number) => {
      dispatch({
        type: 'player/setPositionMillis',
        payload: value,
      });
    },
    { wait: 50 },
  );

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
        onValueChange={onValueChange}
        onSlidingComplete={async (value: number) => {
          await soundManager.setCurrentTime(value);
          soundManager.play();
        }}
        onSlidingStart={() => {
          soundManager.pause();
        }}
      />
    </View>
  );
};
export default PlaySlider;
