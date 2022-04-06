import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withAuth } from '../../hocs';
import styles from '../styles/dealership.module.css';
import { AdminSidebar, NotificationTable } from '../../components';
import { userSelector } from '../../features/authSlice';
import {
  loadNotifications,
  notificationsSelector,
} from '../../features/dealerDashboardSlice';

const Notifications: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const notifications = useSelector(notificationsSelector);

  useEffect(() => void dispatch(loadNotifications(user?.ID)), []);
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <NotificationTable notifications={notifications} />
    </div>
  );
};

export default withAuth(Notifications);
