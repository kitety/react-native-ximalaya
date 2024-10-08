import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AVPlaybackStatus } from 'expo-av';
import { getShow } from '~/api/player';
import { init, pause, play } from '~/config/sound';
import { IPlayerItem } from '~/types/player';

export interface IPlayerState extends IPlayerItem {
  playStatus: 'playing' | 'pause' | 'stop' | 'initialed' | 'unset';
  durationMillis: number;
  positionMillis: number;
  songIds: number[];
}

const initialState: IPlayerState = {
  id: '',
  title: '',
  thumbnailUrl: '',
  soundUrl: '',
  description: '',
  playStatus: 'playing',
  durationMillis: 0,
  positionMillis: 0,
  songIds: [],
};

// 获取节目以及初始化音频
export const playerLoadShow = createAsyncThunk(
  'player/loadShow',
  async ({
    url,
    onPlaybackStatusUpdate,
  }: {
    url: string;
    onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  }) => {
    const res = await getShow();
    const data = res.data;
    await init(url, onPlaybackStatusUpdate);
    return data;
  },
);

// 暂停资源
export const playPause = createAsyncThunk('player/pauseSound', () => pause());

// 播放资源
export const playSound = createAsyncThunk('player/playSound', () => play());

// 停止资源
export const stopSound = createAsyncThunk('player/stopSound', () => stop());

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    reset: (state) => {
      return { ...initialState, songIds: state.songIds };
    },
    setState: (state, action: PayloadAction<{ isEditing: boolean }>) => {
      return {
        ...state,
        ...action.payload,
        playStatus: 'playing',
        durationMillis: 0,
        positionMillis: 0,
      };
    },
    setSongIds: (state, action: PayloadAction<{ songIds: number[] }>) => {
      state.songIds = action.payload.songIds;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.durationMillis = action.payload;
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.positionMillis = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 初始化加载资源
    builder.addCase(playerLoadShow.fulfilled, (state, action) => {
      return { ...state, ...action.payload, playStatus: 'initialed' };
    });
    // 调用播放，就是播放中
    builder.addCase(playSound.fulfilled, (state) => {
      state.playStatus = 'playing';
    });
    // 暂停
    builder.addCase(playPause.fulfilled, (state) => {
      state.playStatus = 'pause';
    });
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;
