import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import dashboardReducer from '../features/dealerDashboardSlice';
import adminDashboardReducer from '../features/adminDashboardSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    adminDashboard: adminDashboardReducer,
    notifications: notificationReducer,
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
