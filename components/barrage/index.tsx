import React from 'react';
import { View } from 'react-native';
import { paddingTop } from '~/pages/detail/const';
import { IMessage } from '~/types/detail';
import BarrageItem from './item';

export interface IBarrage extends IMessage {
  trackIndex: number;
  isFree?: boolean;
}

interface IBarrageProps {
  data: IMessage[];
  maxTrack: number;
  outside: (item: IMessage) => void;
}

// listChunkData是一个二维数组，有maxTrack那么多列，广度优先填充
const formatListChunkData = (list: IMessage[], maxTrack: number) => {
  const listChunkData: IMessage[][] = [];
  for (let i = 0; i < maxTrack; i++) {
    listChunkData.push([]);
  }

  list.forEach((item, index) => {
    const columnIndex = index % maxTrack;
    listChunkData[columnIndex].push(item);
  });
  return listChunkData;
};
const Barrage = ({ data, outside, maxTrack }: IBarrageProps) => {
  const listChunkData = formatListChunkData(data, maxTrack);
  const renderCurrentLine = (items: IMessage[], index: number) =>
    items
      .filter((i) => !i.isShown)
      .map((item) => (
        <BarrageItem
          item={item}
          key={item.id}
          outside={outside}
          trackIndex={index}
        />
      ));
  return (
    <View className='absolute' style={{ top: paddingTop }}>
      {listChunkData.map(renderCurrentLine)}
    </View>
  );
};
export default Barrage;
