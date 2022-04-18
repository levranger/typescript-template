import React, { FC } from 'react';
import { DealerAppTable, Sidebar } from '../components';
import styles from './styles/dealership.module.css';
import { withAuth } from '../hocs';

const DealerPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <DealerAppTable />
    </div>
  );
};
export default withAuth(DealerPage);
