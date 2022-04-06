import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/dealership.module.css';
import { AdminDashboard, AdminSidebar } from '../../components';
import { withAuth } from '../../hocs';
import {
  adminDashboardSelector,
  loadDashboard,
  loadNotifications,
  loadStats,
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';

const Index: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { stats, dashboardApplications } = useSelector(adminDashboardSelector);

  useEffect(() => void dispatch(loadStats(user?.ID)), [user]);
  useEffect(() => void dispatch(loadNotifications(user?.ID)), [user]);
  useEffect(() => void dispatch(loadDashboard(user?.ID)), [user]);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <AdminDashboard
        stats={stats}
        dashboardApplications={dashboardApplications}
      />
    </div>
  );
};

export default withAuth(Index);
