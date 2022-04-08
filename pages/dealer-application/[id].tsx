import React, { FC } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/dealership.module.css';
import { EditDealerApplication, Sidebar } from '../../components';

const DealerApplication: FC = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <EditDealerApplication />
    </div>
  );
};

export default DealerApplication;
