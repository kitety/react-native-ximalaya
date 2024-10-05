import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '~/pages/home';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
        },
        tabBarIndicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: '#f86442',
        },
        tabBarActiveTintColor: '#f86442',
        tabBarInactiveTintColor: '#333',
        lazy: true,
      }}
    >
      <Tab.Screen name='推荐' component={Home} />
    </Tab.Navigator>
  );
};
export default HomeTabs;
