import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import Barrage, { IMessage } from 'components/barrage';
import { AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import Icon from '~/assets/iconfont';
import Touchable from '~/components/touchable';
import soundManager from '~/config/sound';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { playPause, playSound, playerLoadShow } from '~/models/player';
import { ModalStackNavigation, ModalStackParamList } from '~/navigator';
import { viewportWidth } from '~/utils';
import PlaySlider from './playSlider';

const imageWidth = 180;
export const paddingTop = (viewportWidth - imageWidth) / 2;
const scaleValue = viewportWidth / imageWidth;

const originBarrageTexts = [
  '弹幕1',
  '弹幕2',
  '弹幕3',
  '弹幕4',
  '弹幕5',
  '弹幕6',
  '弹幕7',
  '弹幕8',
];
const getRandomBarrageText = () => {
  return originBarrageTexts[
    Math.floor(Math.random() * originBarrageTexts.length)
  ];
};
export interface IDetailState {
  barrageShow: boolean;
  barrageTexts: IMessage[];
}

const Detail = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ModalStackNavigation>();
  const state = useReactive<IDetailState>({
    barrageShow: false,
    barrageTexts: [],
  });
  const route = useRoute<RouteProp<ModalStackParamList, 'Detail'>>();
  const animRef = useRef(new Animated.Value(1));
  const { id } = route.params;
  const { isPlaying, songIds, title, thumbnailUrl, currentPlayId } =
    useAppSelector((s) => s.player);

  const currentIndex = songIds.indexOf(id);
  const previousId = songIds[currentIndex - 1];
  const nextId = songIds[currentIndex + 1];
  const onPlayStatusChange = useCallback(
    (status: AVPlaybackStatus) => {
      const { isLoaded } = status;
      if (isLoaded) {
        const { durationMillis, positionMillis, isPlaying } = status;
        dispatch({
          type: 'player/updatePlayStatus',
          payload: { durationMillis, positionMillis, isPlaying },
        });
      }
    },
    [dispatch],
  );
  useEffect(() => {
    if (currentPlayId !== id) {
      // 需要先暂停一遍音乐
      soundManager.pause();
      dispatch({
        type: 'player/setIdAndReset',
        payload: id,
      });
      const url = `https://music.163.com/song/media/outer/url?id=123456`;
      dispatch(playerLoadShow()).then(async () => {
        try {
          await soundManager.init(url, onPlayStatusChange);
          dispatch(playSound());
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [currentPlayId, id, dispatch, onPlayStatusChange]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.barrageShow) {
      timer = setInterval(() => {
        const id = String(Math.random());
        const data = {
          id,
          text: getRandomBarrageText(),
          isShown: false,
        };
        state.barrageTexts.push(data);
      }, 1000);
    }
    return () => {
      timer && clearInterval(timer);
      state.barrageTexts = [];
    };
  }, [state, state.barrageShow]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
  }, [navigation, title]);

  const handlePlayPress = () => {
    if (isPlaying) {
      dispatch(playPause());
    } else {
      dispatch(playSound());
    }
  };
  const handPlayPrevious = () => {
    if (previousId) {
      navigation.navigate('Detail', { id: previousId });
    }
  };
  const handPlayNext = () => {
    if (nextId) {
      navigation.navigate('Detail', { id: nextId });
    }
  };
  const onBarrage = () => {
    state.barrageShow = !state.barrageShow;
    Animated.timing(animRef.current, {
      toValue: state.barrageShow ? scaleValue : 1,
      duration: 300, //300 ms
      useNativeDriver: true,
    }).start();
  };
  const onBarrageOutside = (item: IMessage) => {
    item.isShown = true;
  };

  return (
    <View style={{ paddingTop }}>
      {/* 封面 */}
      <View className='mb-6 items-center'>
        <Animated.Image
          source={{ uri: thumbnailUrl }}
          className={clsx(
            'bg-[#ccc]',
            state.barrageShow ? 'rounded-b-lg' : 'rounded-lg',
          )}
          style={{
            width: imageWidth,
            height: imageWidth,
            transform: [
              {
                scale: animRef.current,
              },
            ],
          }}
        />
      </View>
      {/* 渐变 */}
      {state.barrageShow && (
        <>
          <LinearGradient
            colors={['rgba(128,104,102,0.5)', '#807c66']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: viewportWidth,
            }}
          />
          <Barrage
            data={state.barrageTexts}
            maxTrack={6}
            outside={onBarrageOutside}
          />
        </>
      )}
      {/* 弹幕按钮 */}
      <Touchable
        className='ml-2.5 w-12 flex-row items-center justify-center rounded-full border border-white px-1.5'
        onPress={onBarrage}>
        <Text className='text-sm text-white'>弹幕</Text>
      </Touchable>
      {/* 进度条 */}
      <PlaySlider />
      {/* 播放按钮 */}
      <View className='flex flex-row justify-center gap-5'>
        <Touchable disabled={!previousId} onPress={() => handPlayPrevious()}>
          <Icon color={'white'} name='icon-shangyishou' size={44} />
        </Touchable>
        <Touchable onPress={() => handlePlayPress()}>
          <Icon
            color={'white'}
            name={isPlaying ? 'icon-pause' : 'icon-bofang1'}
            size={44}
          />
        </Touchable>
        <Touchable disabled={!nextId} onPress={() => handPlayNext()}>
          <Icon color={'white'} name='icon-xiayishou' size={44} />
        </Touchable>
      </View>
    </View>
  );
};

export default Detail;
