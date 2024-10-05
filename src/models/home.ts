import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCarousel, getGuess } from '~/api/home';
import { CarouselItem, GuessItem } from '~/types/home';

export interface HomeState {
  carousels: CarouselItem[];
  guesses: GuessItem[];
  loading: boolean;
}

const initialState: HomeState = {
  carousels: [],
  guesses: [],
  loading: false,
};

export const fetchCarousel = createAsyncThunk('home/carousel', async () => {
  const data = await getCarousel();
  return data;
});
export const fetchGuess = createAsyncThunk('home/guess', async () => {
  const data = await getGuess();
  return data;
});

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarousel.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCarousel.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      state.loading = false;
      state.carousels = action.payload.data;
    });
    builder.addCase(fetchGuess.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchGuess.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchGuess.fulfilled, (state, action) => {
      state.loading = false;
      state.guesses = action.payload.data;
    });
  },
});

const homeReducer = counterSlice.reducer;
export default homeReducer;
