import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCarousel, getChannel, getGuess } from '~/api/home';
import { ICarouselItem, IChannelObject, IGuessItem } from '~/types/home';

export interface IHomeState {
  carousels: ICarouselItem[];
  guesses: IGuessItem[];
  loading: boolean;
  channels: IChannelObject;
  // 当前carousel的index
  carouselIndex: number;
  // 是否显示gradient
  gradientVisible: boolean;
}

const initialState: IHomeState = {
  carousels: [],
  guesses: [],
  loading: false,
  channels: {
    results: [],
    info: {
      page: 0,
      results: 0,
      total: 0,
    },
    pagination: {
      current: 0,
      total: 0,
      pageSize: 0,
    },
  },
  carouselIndex: 0,
  gradientVisible: true,
};

export const fetchCarousel = createAsyncThunk('home/carousel', async () => {
  const data = await getCarousel();
  return data;
});
export const fetchGuess = createAsyncThunk('home/guess', async () => {
  const data = await getGuess();
  return data;
});
export const fetchChannel = createAsyncThunk(
  'home/channel',
  async (page: number = 1) => {
    const data = await getChannel(page);
    return data;
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCarouselIndex: (state, action: PayloadAction<number>) => {
      state.carouselIndex = action.payload;
    },
    setGradientVisible: (state, action: PayloadAction<boolean>) => {
      state.gradientVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      state.carousels = action.payload.data;
    });

    builder.addCase(fetchGuess.fulfilled, (state, action) => {
      state.guesses = action.payload.data;
    });

    builder.addCase(fetchChannel.fulfilled, (state, action) => {
      // 第一页的话需要清空原来的数据
      const isFirstPage = action.meta?.arg === 1;
      const initialResults = isFirstPage ? [] : state.channels.results;
      const results = [...initialResults, ...action.payload.data.results];
      state.channels = {
        ...action.payload.data,
        results,
      };
    });
  },
});

const homeReducer = homeSlice.reducer;
export default homeReducer;
