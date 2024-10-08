import { RouteProp, useRoute } from '@react-navigation/native';
import { AVPlaybackStatus } from 'expo-av';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { playPause, playSound, playerLoadShow } from '~/models/player';
import { ModalStackParamList } from '~/navigator';
import PlaySlider from './playSlider';

const Detail = () => {
  const route = useRoute<RouteProp<ModalStackParamList, 'Detail'>>();
  const { id } = route.params;
  const { playStatus } = useAppSelector((s) => s.player);
  const isPlaying = playStatus === 'playing';
  const dispatch = useAppDispatch();

  const onPlayStatusChange = useCallback(
    (status: AVPlaybackStatus) => {
      const { isLoaded } = status;
      console.log('isLoaded', isLoaded);
      if (isLoaded) {
        const { durationMillis, positionMillis, isPlaying } = status;
        if (isPlaying) {
          dispatch({ type: 'player/setDuration', payload: durationMillis });
          dispatch({ type: 'player/setPosition', payload: positionMillis });
        }
      }
    },
    [dispatch],
  );
  useEffect(() => {
    dispatch(
      playerLoadShow(
        `https://music.163.com/song/media/outer/url?id=${id}`,
        onPlayStatusChange,
      ),
    ).then(() => {
      dispatch(playSound());
    });
  }, [id, dispatch, onPlayStatusChange]);
  const handlePlayPress = () => {
    if (isPlaying) {
      dispatch(playPause());
    } else {
      dispatch(playSound());
    }
  };
  return (
    <View className='pt-24'>
      <PlaySlider />
      <View className='flex flex-row justify-center gap-5'>
        <Touchable onPress={() => handlePlayPress()}>
          <Icon color={'white'} name='icon-shangyishou' size={40} />
        </Touchable>
        <Touchable onPress={() => handlePlayPress()}>
          <Icon
            color={'white'}
            name={isPlaying ? 'icon-pause' : 'icon-bofang1'}
            size={40}
          />
        </Touchable>
        <Touchable onPress={() => handlePlayPress()}>
          <Icon color={'white'} name='icon-xiayishou' size={40} />
        </Touchable>
      </View>
    </View>
  );
};

export default Detail;
