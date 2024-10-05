import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Platform, StyleSheet } from 'react-native';
import Detail from '~/pages/detail';
import BottomTabs, { BottomTabParamList } from './bottomTabs';

export type RootStackParamList = {
  BottomTabs: {
    screen: keyof BottomTabParamList;
  };
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
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
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
          name='BottomTabs'
          component={BottomTabs}
          options={{
            title: '首页',
          }}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{
            title: '详情',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
