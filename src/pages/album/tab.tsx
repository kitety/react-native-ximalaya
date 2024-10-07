import { useReactive } from 'ahooks';
import { Platform } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import Introduction from './introduction';
import List from './list';

interface IRoute {
  key: string;
  title: string;
}
interface IState {
  routes: IRoute[];
  index: number;
}
const Tab = () => {
  const state = useReactive({ index: 1 });
  const onIndexChange = (index: number) => {
    state.index = index;
  };
  const renderScene = ({ route }: { route: IRoute }) => {
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <List />;
    }
  };
  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<IRoute> },
  ) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={{
          backgroundColor: '#eb6d48',
          borderLeftWidth: 20,
          borderRightWidth: 20,
          borderColor: '#fff',
        }}
        labelStyle={{
          color: '#000',
        }}
        style={{
          backgroundColor: '#fff',
        }}
        tabStyle={{
          width: 80,
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomColor: '#e3e3e3',
              borderBottomWidth: 1,
            },
          }),
        }}
      />
    );
  };
  return (
    <TabView
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      navigationState={{
        index: state.index,
        routes: [
          { key: 'introduction', title: '简介' },
          { key: 'albums', title: '节目' },
        ],
      }}
      onIndexChange={onIndexChange}
    />
  );
};

export default Tab;
