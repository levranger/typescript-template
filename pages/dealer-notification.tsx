import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './styles/dealership.module.css';
import { DealerHeader, NotificationTable, Sidebar } from '../components';
import { withAuth } from '../hocs';

const DealerNotification: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <NotificationTable />
    </div>
  );
};

export default withAuth(DealerNotification);
