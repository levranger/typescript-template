import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApplicationInterface,
  ContractInterface,
  CreateDealerArgsInterface,
  DashboardApplicationInterface,
  DealerInterface,
  LoadDealerArgsInterface,
  NotificationInterface,
  StateInterface,
  StatsInterface,
} from '../contracts';
import { RootState } from '../app/store';

import { addNotification } from './notifications/notificationSlice';

type AdminDashboardState = {
  approvedApplications: ApplicationInterface[];
  pendingApplications: ApplicationInterface[];
  incompleteApplications: ApplicationInterface[];
  notifications: NotificationInterface[];
  dealers: DealerInterface[];
  dealerItem: DealerInterface;
  states: StateInterface[];
  stats: StatsInterface;
  dashboardApplications: DashboardApplicationInterface[];
  applicationItem: ApplicationInterface;
  contractsTypes: ContractInterface[];
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: AdminDashboardState = {
  approvedApplications: [],
  pendingApplications: [],
  incompleteApplications: [],
  dealers: [],
  dealerItem: null,
  states: [],
  notifications: [],
  pending: false,
  stats: {
    'Incomplete Applications': 0,
    'Approved Applications': 0,
    'Awaiting Approval Applications': 0,
    'Declined Applications': 0,
  },
  dashboardApplications: [],
  applicationItem: null,
  error: false,
  errorMessage: '',
  contractsTypes: [],
};

export const loadApprovedApplications = createAsyncThunk(
  'adminDashboard/loadApprovedApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getapprovedapplications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadStates = createAsyncThunk(
  'adminDashboard/loadStates',
  async () => {
    const res = await fetch('https://adjournal.prestoapi.com/api/states', {
      method: 'GET',
    });
    const results: StateInterface[] = await res.json();

    return results;
  }
);

export const loadPendingApplications = createAsyncThunk(
  'adminDashboard/loadPendingApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getpendingapplications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadIncompleteApplications = createAsyncThunk(
  'adminDashboard/loadIncompleteApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getincompleteapplications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadDealers = createAsyncThunk(
  'adminDashboard/loadDealers',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getdealers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const response: DealerInterface[] = await res.json();
    return response;
  }
);

export const loadNotifications = createAsyncThunk(
  'adminDashboard/loadNotifications',
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

export const loadDealer = createAsyncThunk(
  'adminDashboard/loadDealer',
  async (payload: LoadDealerArgsInterface) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getdealer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    });
    const result: DealerInterface[] = await res.json();

    return result[0];
  }
);

export const updateDealers = createAsyncThunk(
  'adminDashboard/updateDealers',
  async ({ payload, router }: CreateDealerArgsInterface, thunkApi) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/updatedealers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    });
    const response: [{ ID: number }] = await res.json();

    thunkApi.dispatch(
      addNotification({
        type: 'success',
        message: 'Dealer has been successfully added',
        autoHideDuration: 5000,
      })
    );

    thunkApi.dispatch(
      loadDealer({ userid: payload.userid, dealerid: response[0].ID })
    );

    router.push(`/admin/edit-dealer/${response[0].ID}`);

    return response;
  }
);

// Convert array of stats to object
const convertArrayToObject = (array, key): any => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.Value,
    };
  }, initialValue);
};

export const loadStats = createAsyncThunk(
  'adminDashboard/loadStats',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getstats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const response = await res.json();

    return convertArrayToObject(response, 'Description');
  }
);

export const loadDashboard = createAsyncThunk(
  'adminDashboad/loadDashboard',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getDashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const result: DashboardApplicationInterface[] = await res.json();

    return result;
  }
);

export const loadApplication = createAsyncThunk(
  'adminDashboard/loadApplication',
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

export const loadContractTypes = createAsyncThunk(
  'adminDashboard/loadContractTypes',
  async () => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/contracttypes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const response: ContractInterface[] = await res.json();

    return response;
  }
);

export const dealerDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    setApprovedApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.approvedApplications = payload;
    },
    setPendingApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.pendingApplications = payload;
    },
    setIncompleteApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.incompleteApplications = payload;
    },
    setDealersAction(state, { payload }: PayloadAction<DealerInterface[]>) {
      state.dealers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApprovedApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApprovedApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.approvedApplications = payload;
        state.approvedApplications = state.approvedApplications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadApprovedApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadPendingApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadPendingApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.pendingApplications = payload;
        state.pendingApplications = state.pendingApplications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadPendingApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadIncompleteApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadIncompleteApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.incompleteApplications = payload;
        state.incompleteApplications = state.incompleteApplications.map(
          (item) => ({
            ...item,
            isShown: true,
          })
        );
      })
      .addCase(loadIncompleteApplications.rejected, (state, { payload }) => {
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
      .addCase(loadNotifications.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Error loading notifications';
      })
      .addCase(loadDealers.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadDealers.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.dealers = payload;
        state.dealers = state.dealers.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadDealers.rejected, (state) => {
        state.error = true;
        state.pending = false;
        state.errorMessage = 'Error loading dealers';
      })
      .addCase(loadStates.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadStates.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.states = payload;
      })
      .addCase(loadStates.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading states failed';
      })
      .addCase(updateDealers.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(updateDealers.fulfilled, (state, { payload }) => {
        state.pending = false;
      })
      .addCase(updateDealers.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Updating dealers failed';
      })
      .addCase(loadDealer.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(loadDealer.fulfilled, (state, { payload }) => {
        state.dealerItem = payload;
        state.pending = false;
      })
      .addCase(loadDealer.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading dealer failed';
      })
      .addCase(loadStats.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadStats.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Error loading stats';
      })
      .addCase(loadStats.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.stats = payload;
      })
      .addCase(loadDashboard.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadDashboard.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading dashboard failed';
      })
      .addCase(loadDashboard.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.dashboardApplications = payload;
      })
      .addCase(loadApplication.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApplication.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading application failed';
      })
      .addCase(loadApplication.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.applicationItem = payload;
      })
      .addCase(loadContractTypes.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadContractTypes.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Loading contracts types failed';
      })
      .addCase(loadContractTypes.fulfilled, (state, { payload }) => {
        state.contractsTypes = payload;
      });
  },
});

export const {
  setIncompleteApplicationsAction,
  setApprovedApplicationsAction,
  setDealersAction,
  setPendingApplicationsAction,
} = dealerDashboardSlice.actions;

export const adminDashboardSelector = (state: RootState): AdminDashboardState =>
  state.adminDashboard;

export const approvedApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.approvedApplications;

export const pendingApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.pendingApplications;

export const incompleteApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.incompleteApplications;

export const notificationsSelector = (
  state: RootState
): NotificationInterface[] => state.dashboard.notifications;

export const stateSelector = (state: RootState): StateInterface[] =>
  state.adminDashboard.states;

export const dealersSelector = (state: RootState): DealerInterface[] =>
  state.adminDashboard.dealers;

export const dealerItemSelector = (state: RootState): DealerInterface =>
  state.adminDashboard.dealerItem;

export default dealerDashboardSlice.reducer;
