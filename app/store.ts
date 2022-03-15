import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import editFileReducer from '../features/editFileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    editFile: editFileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
