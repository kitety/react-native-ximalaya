//将毫秒时间转换为音频的播放时间
export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 1000 / 60);
  const seconds = Math.floor((time / 1000) % 60);
  // 00:00这种格式，需要补足0
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  return `${minutesStr}:${secondsStr}`;
};
