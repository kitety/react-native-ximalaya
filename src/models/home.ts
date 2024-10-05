import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HomeState {
  num: number;
}

const initialState: HomeState = {
  num: 0,
};

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ dd: number }>) => {
      const num = action.payload.dd;
      state.num += num;
    },
  },
});

export const { increment } = counterSlice.actions;

const homeReducer = counterSlice.reducer;
export default homeReducer;
