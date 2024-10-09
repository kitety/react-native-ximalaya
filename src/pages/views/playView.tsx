import { View } from 'react-native';

import clsx from 'clsx';
import { useAppSelector } from '~/hooks/state';
import { viewportWidth } from '~/utils';
import Play from './play';

const width = 50;
const height = width + 20;
const left = (viewportWidth - width) / 2;

interface IPlayViewProps {
  routeName: string;
}
const PlayView = ({ routeName }: IPlayViewProps) => {
  const { isPlaying } = useAppSelector((state) => state.player);
  const isShow = !['Root', 'Detail'].includes(routeName);

  return (
    <View
      style={{ width, height, left }}
      className={clsx(
        'absolute bottom-0 rounded-t-3xl bg-[rgba(255,255,255,0.8)] p-1 shadow',
        isPlaying && isShow ? 'block' : 'hidden',
      )}>
      <Play />
    </View>
  );
};

export default PlayView;
