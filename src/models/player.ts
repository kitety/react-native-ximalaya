import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getShow } from '~/api/player';
import soundManager from '~/config/sound';
import { IPlayerItem } from '~/types/player';

export interface IPlayerState extends IPlayerItem {
  isPlaying: boolean;
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
  isPlaying: false,
  durationMillis: 0,
  positionMillis: 0,
  songIds: [],
};

// 获取节目以及初始化音频
export const playerLoadShow = createAsyncThunk('player/loadShow', async () => {
  const res = await getShow();
  return res.data;
});

// 暂停资源
export const playPause = createAsyncThunk('player/pauseSound', () =>
  soundManager.pause(),
);

// 播放资源
export const playSound = createAsyncThunk('player/playSound', () =>
  soundManager.play(),
);

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

    updatePlayStatus: (
      state,
      action: PayloadAction<{
        durationMillis: number;
        positionMillis: number;
        isPlaying: boolean;
      }>,
    ) => {
      const { durationMillis, positionMillis, isPlaying } = action.payload;
      state.durationMillis = durationMillis;
      state.positionMillis = positionMillis;
      state.isPlaying = isPlaying;
    },
  },
  extraReducers: (builder) => {
    // 初始化加载资源
    builder.addCase(playerLoadShow.fulfilled, (state, action) => {
      return { ...state, ...action.payload, playStatus: 'initialed' };
    });
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;
