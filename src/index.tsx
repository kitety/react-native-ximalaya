import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

export default function IndexApp() {
  return (
    <>
      <ScreenContent title='Home' path='App.tsx' />
      <StatusBar style='auto' />
    </>
  );
}
