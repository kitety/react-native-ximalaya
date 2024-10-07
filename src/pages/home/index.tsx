import { useNavigation } from '@react-navigation/native';
import { useMount, useReactive } from 'ahooks';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { fetchCarousel, fetchChannel, fetchGuess } from '~/models/home';
import { RootStackNavigation } from '~/navigator';
import { IChannelItem } from '~/types/home';
import Carousel, { carouselImageHeight } from './carousel';
import ChannelView from './channelItem';
import Guess from './guess';

const Home = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const state = useReactive({ page: 1, refreshing: false });
  const { channels, gradientVisible } = useAppSelector((s) => s.home);
  const dispatch = useAppDispatch();
  useMount(() => {
    dispatch(fetchCarousel());
    dispatch(fetchGuess());
    dispatch(fetchChannel(state.page));
  });

  const onChannelPress = (item: IChannelItem) => {
    navigation.navigate('Album', {
      id: item.id,
      title: item.title,
      image: item.image,
    });
  };

  const onEndReached = () => {
    const isShowMore = channels.results.length < channels.pagination.total;
    if (isShowMore) {
      state.page++;
      dispatch(fetchChannel(state.page));
    }
  };

  const renderChannelItem = ({ item }: ListRenderItemInfo<IChannelItem>) => {
    return <ChannelView item={item} onPress={onChannelPress} />;
  };
  const onRefresh = () => {
    state.refreshing = true;
    state.page = 1;
    dispatch(fetchChannel(state.page)).finally(() => {
      state.refreshing = false;
    });
  };

  const headerComponent = (
    <View className='mt-2.5'>
      <Carousel />
      <View className='bg-white'>
        <Guess />
      </View>
    </View>
  );
  const footerComponent = () => {
    if (channels.pagination.total === 0) return null;
    const isShowLoading = channels.results.length < channels.pagination.total;
    if (isShowLoading) {
      return (
        <View className='mb-1 items-center'>
          <ActivityIndicator color='#0000ff' size='small' />
        </View>
      );
    } else {
      return (
        <View className='mb-2.5 items-center'>
          <Text className='items-center'>没有更多数据了</Text>
        </View>
      );
    }
  };
  const listEmptyComponent = () => {
    return (
      <View className='items-center'>
        <Text className='mt-2 items-center'>暂时没有数据</Text>
      </View>
    );
  };
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const { y } = contentOffset;
    const newGradientVisible = y < carouselImageHeight;
    if (newGradientVisible !== gradientVisible) {
      dispatch({
        type: 'home/setGradientVisible',
        payload: newGradientVisible,
      });
    }
  };

  return (
    <FlatList<IChannelItem>
      data={channels.results}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={listEmptyComponent}
      ListFooterComponent={footerComponent}
      ListHeaderComponent={headerComponent}
      refreshing={state.refreshing}
      renderItem={renderChannelItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      onRefresh={onRefresh}
      onScroll={onScroll}
    />
  );
};

export default Home;
