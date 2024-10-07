import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage, { load } from '~/config/storage';
import { RootState } from '~/config/store';
import { myBaseCategories } from '~/const/model/category';
import { ICategory } from '~/types/category';

export interface ICategoryState {
  myCategories: ICategory[];
  allCategories: ICategory[];
  isEditing: boolean;
}

const initialState: ICategoryState = {
  myCategories: [...myBaseCategories],
  allCategories: [],
  isEditing: false,
};

export const loadCategory = createAsyncThunk(
  'category/loadCategory',
  async () => {
    const [myCategories, allCategories] = await Promise.all([
      load({ key: 'myCategories' }),
      load({ key: 'allCategories' }),
    ]);

    return { myCategories, allCategories };
  },
);
export const toggleEditing = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>('category/toggleEditing', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const {
    myCategories,
    allCategories,
    isEditing: currentEditingState,
  } = state.category;

  // 正在编辑，然后保存数据，同步数据
  if (currentEditingState) {
    await storage.save({
      key: 'myCategories',
      data: myCategories,
    });
    await storage.save({
      key: 'allCategories',
      data: allCategories,
    });
  }
  return !currentEditingState;
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    setState: (state, action: PayloadAction<{ isEditing: boolean }>) => {
      return { ...state, ...action.payload };
    },
  },
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
    builder.addCase(toggleEditing.fulfilled, (state, action) => {
      state.isEditing = action.payload;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
