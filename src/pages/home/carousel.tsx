import { useRef } from 'react';
import { Image, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import SnapCarousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useAppDispatch, useAppSelector } from '~/hooks/state';
import { CarouselItem } from '~/types/home';
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

  const renderItem = ({ item }: { item: CarouselItem }) => {
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
    <View>
      <SnapCarousel<CarouselItem>
        autoPlay
        ref={ref}
        pagingEnabled
        data={carousels}
        renderItem={renderItem}
        width={slideWidth}
        height={carouselImageHeight}
        mode='parallax'
        onProgressChange={progress}
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 20,
        }}
        autoPlayInterval={5000}
        onSnapToItem={handleSnapToItem}
      />
      <Pagination.Basic
        progress={progress}
        data={carousels}
        dotStyle={{
          backgroundColor: 'rgba(255,255,255,0.4)',
          borderRadius: 100,
        }}
        activeDotStyle={{
          backgroundColor: '#f86442',
        }}
        size={6}
        containerStyle={{
          gap: 8,
          marginTop: -20,
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.35)',
          paddingHorizontal: 10,
          paddingVertical: 4,
        }}
        onPress={onPressPagination}
      />
    </View>
  );
};

export default Carousel;
