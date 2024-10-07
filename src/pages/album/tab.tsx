import { useReactive } from 'ahooks';
import { TabView } from 'react-native-tab-view';
import Introduction from './introduction';
import List from './list';

interface IRoute {
  key: string;
  title: string;
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
  return (
    <TabView
      renderScene={renderScene}
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
