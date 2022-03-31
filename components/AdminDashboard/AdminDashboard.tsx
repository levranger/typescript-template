import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import {
  faBell,
  faCalendar,
  faCheck,
  faEdit,
  faInfoCircle,
  faMinusCircle,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './AdminDashboard.module.css';
import { DashboardBox } from '../DashboardBox/DashboardBox';
import { DashboardBoxEnum } from '../../contracts';
import { DashboardBar } from '../DashboardBar/DashboardBar';

export const AdminDashboard: FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => () => void router.push(route);
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.dashboardWrapper}>
        <div className={styles.dashboardHeader}>
          <h2>
            <FontAwesomeIcon icon={faInfoCircle as IconProp} />
          </h2>
          <h2 className={styles.dashboardTitle}>Dashboard</h2>
        </div>
        <div className={styles.boxWrapper}>
          <DashboardBox
            icon={faCheck as IconProp}
            count={15}
            text="Awaiting Review"
            type={DashboardBoxEnum.Pending}
          />
          <DashboardBox
            icon={faEdit as IconProp}
            count={15}
            text="Approved applications"
            type={DashboardBoxEnum.Success}
          />
          <DashboardBox
            icon={faMinusCircle as IconProp}
            count={15}
            text="Incomplete Applications"
            type={DashboardBoxEnum.Failed}
          />
        </div>
        <div className={styles.barWrapper}>
          <DashboardBar
            onNavigate={handleNavigate('/admin/pending')}
            icon={faEdit as IconProp}
            text="Awaiting review"
            description="No Awaiting Review Applications Last 7 Days"
            type={DashboardBoxEnum.Pending}
          />
          <DashboardBar
            onNavigate={handleNavigate('/admin/notifications')}
            icon={faBell as IconProp}
            text="Notifications"
            type={DashboardBoxEnum.Notification}
          />
          <DashboardBar
            onNavigate={handleNavigate('/admin/incomplete')}
            icon={faMinusCircle as IconProp}
            text="New Incomplete Application"
            description="No New Applications Last 7 Days"
            type={DashboardBoxEnum.Failed}
          />
        </div>
      </div>
    </div>
  );
};
