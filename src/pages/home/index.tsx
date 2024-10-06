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
import { ChannelItem } from '~/types/home';
import Carousel, { carouselImageHeight } from './carousel';
import ChannelView from './channelItem';
import Guess from './guess';

const Home = () => {
  const state = useReactive({ page: 1, refreshing: false });
  const { channels, gradientVisible } = useAppSelector((s) => s.home);
  const dispatch = useAppDispatch();
  useMount(() => {
    dispatch(fetchCarousel());
    dispatch(fetchGuess());
    dispatch(fetchChannel(state.page));
  });

  const onChannelPress = (item: ChannelItem) => {};

  const onEndReached = () => {
    const isShowMore = channels.results.length < channels.pagination.total;
    if (isShowMore) {
      state.page++;
      dispatch(fetchChannel(state.page));
    }
  };

  const renderChannelItem = ({ item }: ListRenderItemInfo<ChannelItem>) => {
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
          <ActivityIndicator size='small' color='#0000ff' />
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
        <Text className='items-center'>暂时没有数据</Text>
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
    <FlatList<ChannelItem>
      ListHeaderComponent={headerComponent}
      data={channels.results}
      renderItem={renderChannelItem}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={footerComponent}
      ListEmptyComponent={listEmptyComponent}
      onRefresh={onRefresh}
      refreshing={state.refreshing}
      onScroll={onScroll}
    />
  );
};

export default Home;
