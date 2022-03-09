import counterReducer from '../features/counterSlice';
import kanyeReducer from '../features/kanyeSlice';
import authReducer from '../features/authSlice';

import {Action, configureStore, ThunkAction,} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        kanye: kanyeReducer,
        auth: authReducer
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