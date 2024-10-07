import { useHeaderHeight } from '@react-navigation/elements';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMount } from 'ahooks';
import { BlurView } from 'expo-blur';
import { Image, Text, View } from 'react-native';
import coverRight from '~/assets/image/cover-right.png';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { fetchAlbumDetail } from '~/models/album';
import { RootStackParamList } from '~/navigator';
import Tab from './tab';

const Album = () => {
  const height = useHeaderHeight();
  const album = useAppSelector((s) => s.album);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Album'>>();
  const { id, title, image } = route.params;
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(fetchAlbumDetail(id));
  });
  const renderHeader = () => {
    return (
      <View
        className=' h-[260px]  flex-row items-center bg-red-400 px-5'
        style={{ paddingTop: height }}>
        <BlurView
          className='absolute bottom-0 left-0 right-0 top-0'
          intensity={100}
          tint='light'>
          <Image
            className='absolute bottom-0 left-0 right-0 top-0'
            source={{ uri: image }}
          />
        </BlurView>
        <View>
          <Image
            className='rounded-lg border border-white bg-white'
            source={{ uri: image, width: 98, height: 98 }}
          />
          <Image
            className='absolute -right-6 h-[98px]'
            source={coverRight}
            style={{ resizeMode: 'contain' }}
          />
        </View>
        <View className='ml-6 flex-1 '>
          <Text className='text-lg font-black text-white'>{album.title}</Text>
          <View className='my-2.5 rounded bg-[rgba(0,0,0,0.3)] p-2.5'>
            <Text className='text-white' numberOfLines={1}>
              {album.summary}
            </Text>
          </View>
          <View className='flex-row items-center'>
            <Image
              className='mr-2 h-[26px] w-[26px] rounded-full'
              source={{ uri: album.author.avatar }}
            />
            <Text className='text-white'>{album.author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className='flex-1'>
      {renderHeader()}
      <Tab />
    </View>
  );
};

export default Album;
