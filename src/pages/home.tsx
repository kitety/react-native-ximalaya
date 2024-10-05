import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { RootStackNavigation } from '~/navigator';

const Home = () => {
  const navigation = useNavigation<RootStackNavigation>();
  return (
    <View>
      <Text>Home</Text>
      <Button
        title='Go to Detail'
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
};

export default Home;
