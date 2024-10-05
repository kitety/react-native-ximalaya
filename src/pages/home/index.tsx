import { ScrollView } from 'react-native';
import Carousel from './carousel';
import Guess from './guess';

const Home = () => {
  return (
    <ScrollView>
      <Carousel />
      <Guess />
    </ScrollView>
  );
};

export default Home;
