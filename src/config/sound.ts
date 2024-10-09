import { AVPlaybackStatus, Audio } from 'expo-av';

let sound: Audio.Sound;

// 创建播放器
const init = async (
  url: string,
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void,
) => {
  // 调用init，传入新的url，旧的销毁
  await destroy();
  // console.log('初始化音频播放：', url);
  const audio = await Audio.Sound.createAsync(
    { uri: url },
    { shouldPlay: true },
    onPlaybackStatusUpdate,
  );
  sound = audio.sound;
};

// 播放，直到播放结束才会返回
const play = async () => {
  await sound.playAsync();
};

// 暂停
const pause = async () => {
  if (sound) {
    await sound.pauseAsync();
  }
};
const stop = async () => {
  if (sound) {
    await sound.stopAsync();
  }
};

const getCurrentTime = async () => {
  const playStatus = await sound.getStatusAsync();
  if (playStatus.isLoaded) {
    return playStatus.positionMillis;
  }
  return 0;
};
// 设置播放的时间
const setCurrentTime = async (time: number) => {
  await sound.setPositionAsync(time);
};

const getDuration = async () => {
  const playStatus = await sound.getStatusAsync();
  if (playStatus.isLoaded) {
    return playStatus.durationMillis || 0;
  }
  return 0;
};

const destroy = async () => {
  // console.log('销毁音频播放器');
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
  }
};

const soundManager = {
  init,
  play,
  pause,
  stop,
  getCurrentTime,
  setCurrentTime,
  getDuration,
  destroy,
};

export default soundManager;
