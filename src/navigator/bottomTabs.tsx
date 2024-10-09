import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  TabNavigationState,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { useEffect } from 'react';
import Icon from '~/assets/iconfont';
import Account from '~/pages/account';
import Found from '~/pages/found';
import Listen from '~/pages/listen';
import Play from '~/pages/views/play';
import { RootStackParamList } from '.';
import HomeTabs from './homeTabs';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
  Play: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();
export type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState<{}>;
};

const getHeaderTitle = (routeName: string) => {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账户';
    default:
      return '首页';
  }
};
const BottomTabs = () => {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes);
  useEffect(() => {
    const route = routes?.[0] as unknown as Route;
    const routeName =
      route?.state?.routes[route?.state?.index].name ||
      route?.params?.screen ||
      'HomeTabs';
    const isShowHeader = routeName !== 'HomeTabs';
    const headerTitle = isShowHeader ? getHeaderTitle(routeName) : '';
    navigation.setOptions({
      headerShown: isShowHeader,
      headerTitle,
    });
  }, [navigation, routes]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f86442',
        headerShown: false,
      }}>
      <Tab.Screen
        component={HomeTabs}
        name='HomeTabs'
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name='icon-shouye' size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Listen}
        name='Listen'
        options={{
          tabBarLabel: '我听',
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name='icon-shoucang' size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Play}
        name='Play'
        options={{
          tabBarButton: () => <Play />,
        }}
      />
      <Tab.Screen
        component={Found}
        name='Found'
        options={{
          tabBarLabel: '发现',
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name='icon-faxian' size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Account}
        name='Account'
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Icon color={color} name='icon-user' size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
