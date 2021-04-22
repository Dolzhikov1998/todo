import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import TaskReducers from './TaskReducers';

const store = configureStore({
  reducer: {
    TaskReducers
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppState = ReturnType<typeof store.getState>;

export default store;

