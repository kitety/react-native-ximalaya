import { useMount } from 'ahooks';
import { memo, useRef } from 'react';
import { Animated, Easing, Text } from 'react-native';
import { viewportWidth } from '~/utils';
import { IBarrageItem } from '.';

interface IBarrageItemProps {
  item: IBarrageItem;
  outside: (item: IBarrageItem) => void;
}
const BarrageItem = ({ item, outside }: IBarrageItemProps) => {
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
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: translateXAnimRef.current.interpolate({
              inputRange: [0, 10],
              outputRange: [viewportWidth, -100],
            }),
          },
        ],
      }}>
      <Text className='text-black'>{item.text}</Text>
    </Animated.View>
  );
};
export default memo(BarrageItem);
