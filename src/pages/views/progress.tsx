import { FC, PropsWithChildren } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useAppSelector } from '~/hooks/state';

const Progress: FC<PropsWithChildren> = ({ children }) => {
  const { durationMillis, positionMillis } = useAppSelector(
    (state) => state.player,
  );
  const fill = durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;
  return (
    <AnimatedCircularProgress
      backgroundColor='#ededed'
      fill={fill}
      size={40}
      tintColor='red'
      width={2}>
      {() => <>{children}</>}
    </AnimatedCircularProgress>
  );
};
export default Progress;
