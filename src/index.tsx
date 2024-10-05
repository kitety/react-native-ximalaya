import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './config/store';
import Navigator from './navigator';

export default function IndexApp() {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style='auto' />
    </Provider>
  );
}
