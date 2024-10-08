import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AVPlaybackStatus } from 'expo-av';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { playPause, playSound, playerLoadShow } from '~/models/player';
import { ModalStackNavigation, ModalStackParamList } from '~/navigator';
import PlaySlider from './playSlider';

const Detail = () => {
  const navigation = useNavigation<ModalStackNavigation>();
  const route = useRoute<RouteProp<ModalStackParamList, 'Detail'>>();
  const { id } = route.params;
  const { playStatus, songIds } = useAppSelector((s) => s.player);
  const isPlaying = playStatus === 'playing';
  const dispatch = useAppDispatch();

  const onPlayStatusChange = useCallback(
    (status: AVPlaybackStatus) => {
      const { isLoaded } = status;
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
    console.log('播放---id：', id);
    dispatch({
      type: 'player/reset',
    });
    dispatch(
      playerLoadShow({
        url: `https://music.163.com/song/media/outer/url?id=${id}`,
        onPlaybackStatusUpdate: onPlayStatusChange,
      }),
    ).then(() => dispatch(playSound()));
  }, [id, dispatch, onPlayStatusChange]);
  const handlePlayPress = () => {
    if (isPlaying) {
      dispatch(playPause());
    } else {
      dispatch(playSound());
    }
  };
  const handPlayPrevious = () => {
    const index = songIds.indexOf(id);
    const previousId = songIds[index - 1];
    console.log('previousId', songIds, previousId);
    if (previousId) {
      navigation.navigate('Detail', { id: previousId });
    }
  };
  const handPlayNext = () => {
    const index = songIds.indexOf(id);
    const nextId = songIds[index + 1];
    console.log('nextId', nextId);
    if (nextId) {
      navigation.navigate('Detail', { id: nextId });
    }
  };
  return (
    <View className='pt-24'>
      <PlaySlider />
      <View className='flex flex-row justify-center gap-5'>
        <Touchable onPress={() => handPlayPrevious()}>
          <Icon color={'white'} name='icon-shangyishou' size={40} />
        </Touchable>
        <Touchable onPress={() => handlePlayPress()}>
          <Icon
            color={'white'}
            name={isPlaying ? 'icon-pause' : 'icon-bofang1'}
            size={40}
          />
        </Touchable>
        <Touchable onPress={() => handPlayNext()}>
          <Icon color={'white'} name='icon-xiayishou' size={40} />
        </Touchable>
      </View>
    </View>
  );
};

export default Detail;
