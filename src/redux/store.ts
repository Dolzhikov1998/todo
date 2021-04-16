import { configureStore } from '@reduxjs/toolkit';
import todos from './TaskReducers';






const store = configureStore({
  reducer: {
    todos
  }
});

export default store;

