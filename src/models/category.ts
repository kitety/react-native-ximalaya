import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { load } from '~/config/storage';
import { ICategory } from '~/types/category';

export interface ICategoryState {
  myCategories: ICategory[];
  allCategories: ICategory[];
}

const myBaseCategories = [
  {
    id: 'home',
    name: '推荐',
  },
  {
    id: 'vip',
    name: 'VIP',
  },
];
const initialState: ICategoryState = {
  myCategories: [...myBaseCategories],
  allCategories: [],
};

export const loadCategory = createAsyncThunk('category/load', async () => {
  const [myCategories, allCategories] = await Promise.all([
    load({ key: 'myCategories' }),
    load({ key: 'allCategories' }),
  ]);
  return { myCategories, allCategories };
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadCategory.fulfilled,
      (
        state,
        action: PayloadAction<{
          myCategories: ICategory[];
          allCategories: ICategory[];
        }>,
      ) => {
        const { myCategories, allCategories } = action.payload;
        if (myCategories) {
          state.myCategories = myCategories;
        }
        state.allCategories = allCategories || [];
      },
    );
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
