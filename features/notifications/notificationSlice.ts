import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Notification, NotificationTypes } from './components/NotificationItem';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';

export type NotificationPositions =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left';

type NotificationsState = {
  notifications: Notification[];
  position: NotificationPositions;
  autoHideDuration: number;
};
const initialState: NotificationsState = {
  notifications: [],
  position: 'top-right',
  autoHideDuration: 6000,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    /**
     * Add a notification to the list
     *
     * @param state - Our current Redux state
     * @param payload - A notification item without an id, as we'll generate this.
     */
    addNotification: (
      state,
      { payload }: PayloadAction<Omit<Notification, 'id'>>
    ) => {
      const notification: Notification = {
        id: nanoid(),
        ...payload,
      };

      state.notifications.push(notification);
    },
    /**
     * Remove a notification from the list
     *
     * @param state - Our current Redux state
     * @param payload - The id of the Notification to dismiss
     */
    dismissNotification: (
      state,
      { payload }: PayloadAction<Notification['id']>
    ) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === payload
      );

      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
  },
});

const { reducer, actions } = notificationsSlice;

// Actions
export const { addNotification, dismissNotification } = actions;

// Selectors
const selectNotifications = (state: RootState): Notification[] =>
  state.notifications.notifications;

const selectNotificationPosition = (state: RootState): NotificationPositions =>
  state.notifications.position;

const selectNotificationDuration = (state: RootState): number =>
  state.notifications.autoHideDuration;

// Hooks
export const useNotifications = (): Notification[] =>
  useAppSelector(selectNotifications);

export const useNotificationPosition = (): NotificationPositions =>
  useAppSelector(selectNotificationPosition);

export const useNotificationDuration = (): number =>
  useAppSelector(selectNotificationDuration);

export default reducer;
