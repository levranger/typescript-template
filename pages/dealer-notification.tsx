import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/dealership.module.css';
import { NotificationTable, Sidebar } from '../components';
import { withAuth } from '../hocs';
import { userSelector } from '../features/authSlice';
import {
  loadNotifications,
  notificationsSelector,
} from '../features/dealerDashboardSlice';

const DealerNotification: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const notifications = useSelector(notificationsSelector);
  useEffect(() => void dispatch(loadNotifications(user.ID)), []);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <NotificationTable notifications={notifications} />
    </div>
  );
};

export default withAuth(DealerNotification);
