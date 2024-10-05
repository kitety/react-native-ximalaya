import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { RootStackNavigation } from '~/navigator';

const Found = () => {
  const navigation = useNavigation<RootStackNavigation>();
  return (
    <View>
      <Text>Home</Text>
      <Button
        title='Go to Detail'
        onPress={() =>
          navigation.navigate('Detail', {
            id: 1,
          })
        }
      />
    </View>
  );
};

export default Found;
