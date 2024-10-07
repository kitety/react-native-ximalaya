import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import Category from '~/pages/category';
import Detail from '~/pages/detail';
import BottomTabs, { BottomTabParamList } from './bottomTabs';

export type RootStackParamList = {
  BottomTabs: {
    screen: keyof BottomTabParamList;
  };
  Category: undefined;
  Detail: {
    id: number;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

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
          component={Detail}
          name='Detail'
          options={{
            title: '详情',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
