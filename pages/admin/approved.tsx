import React, { FC, useEffect } from 'react';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { AdminSidebar, ApplicationsTable } from '../../components';
import styles from '../styles/dealership.module.css';
import { withAuth } from '../../hocs';
import { userSelector } from '../../features/authSlice';
import {
  approvedApplicationsSelector,
  loadApprovedApplications,
} from '../../features/adminDashboardSlice';
import { DashboardBoxEnum } from '../../contracts';

const Approved: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const approvedApplications = useSelector(approvedApplicationsSelector);

  useEffect(() => void dispatch(loadApprovedApplications(user?.ID)), []);
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <ApplicationsTable
        type={DashboardBoxEnum.Success}
        title="Applications Approved"
        applications={approvedApplications}
        icon={faCheck as IconProp}
      />
    </div>
  );
};

export default withAuth(Approved);
