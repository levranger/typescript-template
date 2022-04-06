import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationInterface, NotificationInterface } from '../contracts';
import { RootState } from '../app/store';

type DashboardState = {
  applications: ApplicationInterface[];
  notifications: NotificationInterface[];
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: DashboardState = {
  applications: [],
  notifications: [],
  pending: false,
  error: false,
  errorMessage: '',
};

export const loadApplications = createAsyncThunk(
  'dashboard/loadApplications',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getaplications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadNotifications = createAsyncThunk(
  'dashboard/loadNotifications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getnotifications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: NotificationInterface[] = await res.json();
    return response;
  }
);
export const dealerDashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.applications = payload;
    },
    setNotificationsAction(
      state,
      { payload }: PayloadAction<NotificationInterface[]>
    ) {
      state.notifications = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.applications = payload;
        state.applications = state.applications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadNotifications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadNotifications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.notifications = payload;
        state.notifications = state.notifications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadNotifications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Error loading notifications';
      });
  },
});

export const { setApplicationsAction, setNotificationsAction } =
  dealerDashboardSlice.actions;

export const applicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.dashboard.applications;

export const notificationsSelector = (
  state: RootState
): NotificationInterface[] => state.dashboard.notifications;

export default dealerDashboardSlice.reducer;
