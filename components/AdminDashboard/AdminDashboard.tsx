import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import {
  faBell,
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
import {
  DashboardApplicationInterface,
  DashboardBoxEnum,
  StatsInterface,
} from '../../contracts';
import { DashboardBar } from '../DashboardBar/DashboardBar';

interface Props {
  stats: StatsInterface;
  dashboardApplications: DashboardApplicationInterface[];
}
export const AdminDashboard: FC<Props> = ({ stats, dashboardApplications }) => {
  const router = useRouter();

  const incompleteApplications = dashboardApplications.filter(
    (item) => item.StatusID === 5
  );
  const awaitingApproveApplications = dashboardApplications.filter(
    (item) => item.StatusID === 1
  );

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
            count={stats['Awaiting Approval Applications']}
            text="Awaiting Review"
            type={DashboardBoxEnum.Pending}
          />
          <DashboardBox
            icon={faEdit as IconProp}
            count={stats['Approved Applications']}
            text="Approved applications"
            type={DashboardBoxEnum.Success}
          />
          <DashboardBox
            icon={faMinusCircle as IconProp}
            count={stats['Incomplete Applications']}
            text="Incomplete Applications"
            type={DashboardBoxEnum.Failed}
          />
        </div>
        <div className={styles.barWrapper}>
          <DashboardBar
            onNavigate={handleNavigate('/admin/pending')}
            icon={faEdit as IconProp}
            applications={awaitingApproveApplications}
            text="Awaiting review"
            description={`${
              awaitingApproveApplications.length < 1
                ? 'No New Applications Last 7 Days'
                : `${awaitingApproveApplications.length} Applications`
            }  `}
            type={DashboardBoxEnum.Pending}
          />
          <DashboardBar
            onNavigate={handleNavigate('/admin/notifications')}
            icon={faBell as IconProp}
            text="Notifications"
            type={DashboardBoxEnum.Notification}
          />
          <DashboardBar
            applications={incompleteApplications}
            onNavigate={handleNavigate('/admin/incomplete')}
            icon={faMinusCircle as IconProp}
            text="New Incomplete Application"
            description={`${
              incompleteApplications.length < 1
                ? 'No New Applications Last 7 Days'
                : `${incompleteApplications.length} Applications`
            }  `}
            type={DashboardBoxEnum.Failed}
          />
        </div>
      </div>
    </div>
  );
};
