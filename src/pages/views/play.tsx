import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import { useAppSelector } from '~/hooks/state';
import { ModalStackNavigation } from '~/navigator';
import Progress from './progress';

const Play = () => {
  const navigation = useNavigation<ModalStackNavigation>();
  const { isPlaying, thumbnailUrl, currentPlayId } = useAppSelector(
    (state) => state.player,
  );
  const animRef = useRef(new Animated.Value(0));
  const animTiming = Animated.loop(
    Animated.timing(animRef.current, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    { iterations: -1 },
  );
  const animTimingRef = useRef(animTiming);

  useEffect(() => {
    if (isPlaying) {
      animTimingRef.current.start();
    } else {
      animTimingRef.current.stop();
    }
  }, [isPlaying]);

  return (
    <Touchable
      className='items-center justify-center rounded-3xl'
      onPress={() => {
        navigation.navigate('Detail', { id: currentPlayId });
      }}>
      <Progress>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}>
          {thumbnailUrl ? (
            <Image
              className={clsx('h-12 w-12 rounded-full')}
              source={{ uri: thumbnailUrl }}
            />
          ) : (
            <Icon color={'#ededed'} name='icon-bofang3' size={38} />
          )}
        </Animated.View>
      </Progress>
    </Touchable>
  );
};

export default Play;
