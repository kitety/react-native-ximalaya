import { AVPlaybackStatus, Audio } from 'expo-av';

let sound: Audio.Sound;

// 创建播放器
export const init = async (
  url: string,
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void,
) => {
  // 调用init，传入新的url，旧的销毁
  await destroy();
  console.log('初始化音频播放：', url);
  const audio = await Audio.Sound.createAsync(
    { uri: url },
    { shouldPlay: true },
    onPlaybackStatusUpdate,
  );
  sound = audio.sound;
};

// 播放，直到播放结束才会返回
export const play = async () => {
  await sound.playAsync();
};

// 暂停
export const pause = async () => {
  await sound.pauseAsync();
};
export const stop = async () => {
  await sound.stopAsync();
};

export const getCurrentTime = async () => {
  const playStatus = await sound.getStatusAsync();
  if (playStatus.isLoaded) {
    return playStatus.positionMillis;
  }
  return 0;
};

export const getDuration = async () => {
  const playStatus = await sound.getStatusAsync();
  if (playStatus.isLoaded) {
    return playStatus.durationMillis || 0;
  }
  return 0;
};

export const destroy = async () => {
  console.log('销毁音频播放器');
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
  }
};
