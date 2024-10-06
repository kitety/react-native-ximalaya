import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RootStackParamList } from '~/navigator';

const Detail = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
