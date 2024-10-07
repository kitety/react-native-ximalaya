import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import clsx from 'clsx';
import { Animated, Platform, StatusBar, StyleSheet, View } from 'react-native';
import Icon from '~/assets/iconfont';
import Album from '~/pages/album';
import Category from '~/pages/category';
import Detail from '~/pages/detail';
import { IGuessItem } from '~/types/home';
import { isIOS } from '~/utils';
import BottomTabs, { BottomTabParamList } from './bottomTabs';

export type RootStackParamList = {
  BottomTabs: {
    screen: keyof BottomTabParamList;
  };
  Category: undefined;
  Album: IGuessItem;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const getAlbumOptions = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) => {
  return {
    title: route.params.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: 0,
    },
    headerTintColor: '#fff',
    headerBackground: () => (
      <Animated.View className='flex-1 bg-white opacity-0'></Animated.View>
    ),
  };
};

const RootStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerMode: 'float',
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerStatusBarHeight: StatusBar.currentHeight ?? undefined,
        headerStyle: {
          // backgroundColor: '#f86442',
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
      }}>
      <Stack.Screen
        component={BottomTabs}
        name='BottomTabs'
        options={{
          title: '首页',
        }}
      />
      <Stack.Screen
        component={Category}
        name='Category'
        options={{
          title: '分类',
        }}
      />
      <Stack.Screen component={Album} name='Album' options={getAlbumOptions} />
    </Stack.Navigator>
  );
};

export type ModalStackParamList = {
  Root: undefined;
  Detail: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();
export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

const ModalStackScreen = () => {
  //  headerMode='screen'每个页面独立的标题栏,iOS安卓一致 presentation='modal'全屏
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTitleAlign: 'center',
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerBackTitleVisible: false,
      }}>
      <ModalStack.Screen
        component={RootStackScreen}
        name='Root'
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        component={Detail}
        name='Detail'
        options={{
          presentation: 'modal', // 从下往上打开
          animationTypeForReplace: 'push',
          animationEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: '#807c66',
          },
          headerBackImage: ({ tintColor }) => (
            <View className={clsx('-rotate-90', { 'mx-2': isIOS })}>
              <Icon color={tintColor} name='icon-fanhui1' size={30} />
            </View>
          ),
        }}
      />
    </ModalStack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <ModalStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
