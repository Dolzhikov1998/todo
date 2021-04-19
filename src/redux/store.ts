import { configureStore } from '@reduxjs/toolkit';
import TaskReducers from './TaskReducers';

const store = configureStore({
  reducer: {
    TaskReducers
  }
});

export type AppState = ReturnType<typeof store.getState>;

export default store;

