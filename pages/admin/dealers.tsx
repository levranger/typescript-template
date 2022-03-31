import React, { FC } from 'react';
import { withAuth } from '../../hocs';
import styles from '../styles/dealership.module.css';
import { AdminSidebar, DealerContent } from '../../components';

const Dealers: FC = () => {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <DealerContent />
    </div>
  );
};

export default withAuth(Dealers);
