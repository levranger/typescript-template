import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Simulate } from 'react-dom/test-utils';
import {
  AddApplicationArgs,
  ApplicationInterface,
  NotificationInterface,
} from '../contracts';
import { RootState } from '../app/store';
import load = Simulate.load;
import { addNotification } from './notifications/notificationSlice';

type DashboardState = {
  applications: ApplicationInterface[];
  notifications: NotificationInterface[];
  applicationItem: ApplicationInterface;
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: DashboardState = {
  applications: [],
  notifications: [],
  applicationItem: null,
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

export const loadApplicationItem = createAsyncThunk(
  'dashboard/loadApplicationItem',
  async (id: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ id: Number(id) }),
    });
    const response: ApplicationInterface[] = await res.json();
    return response[0];
  }
);

export const updateApplication = createAsyncThunk(
  'dashboard/addApplication',
  async (payload: AddApplicationArgs, thunkApi) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/updateapplication',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const response: any[] = await res.json();

    if (response[0]?.Message === 'Success') {
      thunkApi.dispatch(
        addNotification({
          type: 'success',
          message: 'Application has been updated',
          autoHideDuration: 6000,
        })
      );
    }
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
      })
      .addCase(loadApplicationItem.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApplicationItem.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.applicationItem = payload;
      })
      .addCase(loadApplicationItem.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading application failed';
      })
      .addCase(updateApplication.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(updateApplication.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Adding application failed';
        state.pending = false;
      })
      .addCase(updateApplication.fulfilled, (state) => {
        state.pending = false;
      });
  },
});

export const { setApplicationsAction, setNotificationsAction } =
  dealerDashboardSlice.actions;

export const dealerDashboardSelector = (state: RootState): DashboardState =>
  state.dashboard;
export const applicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.dashboard.applications;

export const notificationsSelector = (
  state: RootState
): NotificationInterface[] => state.dashboard.notifications;

export default dealerDashboardSlice.reducer;
