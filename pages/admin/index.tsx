import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/dealership.module.css';
import { AdminDashboard, AdminSidebar } from '../../components';
import { withAuth } from '../../hocs';
import { loadNotifications } from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';

const Index: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => void dispatch(loadNotifications(user.ID)), [user]);
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <AdminDashboard />
    </div>
  );
};

export default withAuth(Index);
