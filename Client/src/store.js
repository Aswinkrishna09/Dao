import { configureStore } from '@reduxjs/toolkit';
import Reducer from './reducers/index.js';

export default configureStore({
  reducer: {
    Reducer: Reducer,
  },
});
