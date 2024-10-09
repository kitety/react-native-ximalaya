import { useMount } from 'ahooks';
import { memo, useRef } from 'react';
import { Animated, Easing, Text } from 'react-native';
import { viewportWidth } from '~/utils';
import { IMessage } from '.';

interface IBarrageItemProps {
  item: IMessage;
  outside: (item: IMessage) => void;
  trackIndex: number;
}
const BarrageItem = ({ item, outside, trackIndex }: IBarrageItemProps) => {
  const translateXAnimRef = useRef(new Animated.Value(0));
  useMount(() => {
    Animated.timing(translateXAnimRef.current, {
      toValue: 10,
      duration: 8000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        outside(item);
      }
    });
  });
  const width = item.text.length * 15;
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: trackIndex * 30,
        transform: [
          {
            translateX: translateXAnimRef.current.interpolate({
              inputRange: [0, 10],
              outputRange: [viewportWidth, -width],
            }),
          },
        ],
      }}>
      <Text className='text-black'>{item.text}</Text>
    </Animated.View>
  );
};
export default memo(BarrageItem);
