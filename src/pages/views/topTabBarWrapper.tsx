import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { useUpdate } from 'ahooks';
import { LinearGradient } from 'expo-linear-gradient';
import gsap from 'gsap';
import { FC, useEffect, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
import Touchable from '~/components/touchable';
import { useAppSelector } from '~/hooks/state';

interface TopTabBarWrapperProps extends MaterialTopTabBarProps {}

const GradientComponent = () => {
  const update = useUpdate();
  const { carouselIndex, carousels, gradientVisible } = useAppSelector(
    (state) => state.home,
  );
  const colorRef = useRef({ start: '#ccc', end: '#e2e2e2' });
  const colors = useMemo(() => {
    return carousels?.[carouselIndex]?.colors || ['#ccc', '#e2e2e2'];
  }, [carouselIndex, carousels]);

  useEffect(() => {
    if (gradientVisible) {
      const tween = gsap.to(colorRef.current, {
        start: colors[0],
        end: colors[1],
        duration: 0.6,
        onUpdate: function () {
          update();
        },
        onComplete: function () {
          update();
        },
      });
      return () => {
        tween.kill();
      };
    }
  }, [colors, update, gradientVisible]);
  return gradientVisible ? (
    <LinearGradient
      colors={[colorRef.current.start, colorRef.current.end]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 260,
      }}
    />
  ) : null;
};
const TopTabBarWrapper: FC<TopTabBarWrapperProps> = (props) => {
  const height = getStatusBarHeight(true);
  const { gradientVisible } = useAppSelector((state) => state.home);
  const textColor = gradientVisible ? 'text-white' : '';
  return (
    <View className='bg-white' style={{ paddingTop: height }}>
      <GradientComponent />
      <View className='flex-row items-center justify-between'>
        <MaterialTopTabBar {...props} />
        <Touchable className='border-l border-[#ccc] px-2.5'>
          <Text className={textColor}>分类</Text>
        </Touchable>
      </View>
      <View className='flex-row items-center justify-between gap-6 px-4 py-2'>
        <Touchable className='h-[30px] flex-1 justify-center rounded-[15px] bg-[rgba(0,0,0,0.1)] pl-3 '>
          <Text className={textColor}>搜索按钮</Text>
        </Touchable>
        <Touchable className='-mt-1'>
          <Text className={textColor}>历史记录</Text>
        </Touchable>
      </View>
    </View>
  );
};

export default TopTabBarWrapper;
