import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { useAppSelector } from '~/hooks/state';
import Home from '~/pages/home';
import TopTabBarWrapper from '~/pages/views/topTabBarWrapper';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };
  const { gradientVisible } = useAppSelector((s) => s.home);
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          flex: 1,
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
        },
        tabBarIndicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: gradientVisible ? '#fff' : '#f86442',
        },
        tabBarActiveTintColor: gradientVisible ? '#fff' : '#f86442',
        tabBarInactiveTintColor: '#333',
        lazy: true,
        tabBarBounces: true,
      }}>
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarLabel: '推荐',
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeTabs;
