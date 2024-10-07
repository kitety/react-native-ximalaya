import { useRef } from 'react';
import { Image, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import SnapCarousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { ICarouselItem } from '~/types/home';
import { hp, viewportWidth, wp } from '~/utils';

const slideWidth = viewportWidth;
const imageWidth = wp(90);
export const carouselImageHeight = hp(26);

const Carousel = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const { carousels } = useAppSelector((s) => s.home);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem = ({ item }: { item: ICarouselItem }) => {
    return (
      <View className='items-center'>
        <Image
          source={{ uri: item.image }}
          style={{
            width: imageWidth,
            height: carouselImageHeight,
            borderRadius: 8,
          }}
        />
      </View>
    );
  };

  const handleSnapToItem = (index: number) => {
    dispatch({
      type: 'home/setCarouselIndex',
      payload: index,
    });
  };

  return (
    <View className='mb-4'>
      <SnapCarousel<ICarouselItem>
        autoPlay
        pagingEnabled
        autoPlayInterval={5000}
        data={carousels}
        height={carouselImageHeight}
        mode='parallax'
        ref={ref}
        renderItem={renderItem}
        width={slideWidth}
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 20,
        }}
        onProgressChange={progress}
        onSnapToItem={handleSnapToItem}
      />
      <Pagination.Basic
        data={carousels}
        progress={progress}
        size={6}
        activeDotStyle={{
          backgroundColor: '#f86442',
        }}
        containerStyle={{
          gap: 8,
          marginTop: -20,
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.35)',
          paddingHorizontal: 10,
          paddingVertical: 4,
        }}
        dotStyle={{
          backgroundColor: 'rgba(255,255,255,0.4)',
          borderRadius: 100,
        }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default Carousel;
