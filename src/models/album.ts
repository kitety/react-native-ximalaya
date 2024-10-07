import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAlbumDetail } from '~/api/album';
import { IAlbumData } from '~/types/album';

export interface IAlbumState extends IAlbumData {}

const initialState: IAlbumData = {
  id: '',
  thumbnailUrl: '',
  title: '',
  author: {
    id: '',
    name: '',
    attention: '',
    avatar: '',
  },
  introduction: '',
  list: [],
  summary: '',
};

export const fetchAlbumDetail = createAsyncThunk(
  'album/fetchAlbumDetail',
  async (id: string) => {
    const res = await getAlbumDetail(id);
    return res.data;
  },
);
export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAlbumDetail.fulfilled,
      (state, action: PayloadAction<IAlbumData>) => {
        return { ...state, ...action.payload };
      },
    );
  },
});

const categoryReducer = albumSlice.reducer;
export default categoryReducer;
