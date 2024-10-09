import React from 'react';
import { View } from 'react-native';
import BarrageItem from './item';

export interface IBarrageItem {
  id: string;
  text: string;
}

interface IBarrageProps {
  data: IBarrageItem[];
  outside: (item: IBarrageItem) => void;
}
const Barrage = ({ data, outside }: IBarrageProps) => {
  return (
    <View>
      {data.map((item) => (
        <BarrageItem item={item} key={item.id} outside={outside} />
      ))}
    </View>
  );
};
export default Barrage;
