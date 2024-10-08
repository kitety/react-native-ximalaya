import { configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import albumReducer from '~/models/album';
import categoryReducer from '~/models/category';
import homeReducer from '~/models/home';
import playerReducer from '~/models/player';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    category: categoryReducer,
    album: albumReducer,
    player: playerReducer,
  },
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
