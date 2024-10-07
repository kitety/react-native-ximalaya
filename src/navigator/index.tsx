import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { Animated, Platform, StatusBar, StyleSheet } from 'react-native';
import Album from '~/pages/album';
import Category from '~/pages/category';
import { IGuessItem } from '~/types/home';
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
    headerBackground: () => (
      <Animated.View className='flex-1 bg-white opacity-0'></Animated.View>
    ),
  };
};

const Navigator = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen
          component={Album}
          name='Album'
          options={getAlbumOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
