import { Text, View } from 'react-native';
import { useAppSelector } from '~/hooks/state';

const Introduction = () => {
  const { introduction } = useAppSelector((s) => s.album);
  return (
    <View className='p-2.5'>
      <Text>{introduction}</Text>
    </View>
  );
};

export default Introduction;
