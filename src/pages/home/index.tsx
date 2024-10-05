import { useMount } from 'ahooks';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { fetchCarousel, fetchChannel, fetchGuess } from '~/models/home';
import { ChannelItem } from '~/types/home';
import Carousel from './carousel';
import ChannelView from './channelItem';
import Guess from './guess';

const Home = () => {
  const { channels } = useAppSelector((s) => s.home);
  const dispatch = useAppDispatch();
  useMount(() => {
    dispatch(fetchCarousel());
    dispatch(fetchGuess());
    dispatch(fetchChannel());
  });

  const renderChannelItem = ({ item }: ListRenderItemInfo<ChannelItem>) => {
    return <ChannelView item={item} />;
  };
  const headerComponent = (
    <View>
      <Carousel />
      <Guess />
    </View>
  );
  return (
    <FlatList<ChannelItem>
      ListHeaderComponent={headerComponent}
      data={channels.results}
      renderItem={renderChannelItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Home;
