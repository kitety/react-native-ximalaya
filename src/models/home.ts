import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCarousel, getChannel, getGuess } from '~/api/home';
import { CarouselItem, ChannelObject, GuessItem } from '~/types/home';

export interface HomeState {
  carousels: CarouselItem[];
  guesses: GuessItem[];
  loading: boolean;
  channels: ChannelObject;
}

const initialState: HomeState = {
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

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      state.carousels = action.payload.data;
    });

    builder.addCase(fetchGuess.fulfilled, (state, action) => {
      state.guesses = action.payload.data;
    });

    builder.addCase(fetchChannel.fulfilled, (state, action) => {
      const results = [
        ...state.channels.results,
        ...action.payload.data.results,
      ];
      state.channels = {
        ...action.payload.data,
        results,
      };
    });
  },
});

const homeReducer = counterSlice.reducer;
export default homeReducer;
