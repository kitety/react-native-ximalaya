import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { debounce } from 'lodash-es';
import { getShow } from '~/api/player';
import { saveProgram } from '~/config/realm';
import soundManager from '~/config/sound';
import { IPlayerItem } from '~/types/player';

export interface IPlayerState extends IPlayerItem {
  isPlaying: boolean;
  durationMillis: number;
  positionMillis: number;
  songIds: string[];
  currentPlayId: string;
}

const initialState: IPlayerState = {
  currentPlayId: '',
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
// save ProgramDocument
const saveProgramDocument = debounce(saveProgram, 800);

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setIdAndReset: (state, action: PayloadAction<string>) => {
      return {
        ...initialState,
        songIds: state.songIds,
        currentPlayId: action.payload,
      };
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
    setSongIds: (state, action: PayloadAction<{ songIds: string[] }>) => {
      state.songIds = action.payload.songIds;
    },
    setPositionMillis: (state, action: PayloadAction<number>) => {
      state.positionMillis = action.payload;
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
      // 同步realm存储
      const data = {
        id: state.id,
        title: state.title,
        thumbnailUrl: state.thumbnailUrl,
        currentTime: state.positionMillis,
        duration: state.durationMillis,
      };
      saveProgramDocument(data);
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
