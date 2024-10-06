import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-screen-helper';
import Touchable from '~/components/touchable';
import { useAppSelector } from '~/hooks/state';

interface TopTabBarWrapperProps extends MaterialTopTabBarProps {}
const TopTabBarWrapper: FC<TopTabBarWrapperProps> = (props) => {
  const height = getStatusBarHeight(true);
  const { carouselIndex, carousels } = useAppSelector((state) => state.home);
  const colors = carousels[carouselIndex]?.colors || ['#ccc', '#e2e2e2'];
  return (
    <View className='bg-white' style={{ paddingTop: height }}>
      <LinearGradient
        colors={colors}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 260,
        }}
      />
      <View className='flex-row items-center justify-between'>
        <MaterialTopTabBar {...props} />
        <Touchable className='border-l border-[#ccc] px-2.5'>
          <Text>分类</Text>
        </Touchable>
      </View>
      <View className='flex-row items-center justify-between gap-6 px-4 py-2'>
        <Touchable className='h-[30px] flex-1 justify-center rounded-[15px] bg-[rgba(0,0,0,0.1)] pl-3 '>
          <Text>搜索按钮</Text>
        </Touchable>
        <Touchable className='-mt-1'>
          <Text>历史记录</Text>
        </Touchable>
      </View>
    </View>
  );
};

export default TopTabBarWrapper;
