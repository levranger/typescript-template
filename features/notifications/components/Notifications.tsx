import React, { FC } from 'react';
import { useNotifications } from '../notificationSlice';
import { NotificationItem } from './NotificationItem';
import { NotificationList } from './NotificationList';

export const Notifications: FC = () => {
  const notifications = useNotifications();

  return (
    <NotificationList>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </NotificationList>
  );
};
