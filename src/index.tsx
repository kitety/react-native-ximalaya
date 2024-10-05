import { StatusBar } from 'expo-status-bar';
import Navigator from './navigator';

export default function IndexApp() {
  return (
    <>
      <Navigator />
      <StatusBar style='auto' />
    </>
  );
}
