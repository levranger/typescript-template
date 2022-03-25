import React, { FC } from 'react';
import { DealerHeader, Sidebar, CreateAppForm } from '../components';
import { withAuth } from '../hocs';
import styles from './styles/create-application.module.css';

const CreateApplication: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <CreateAppForm />
    </div>
  );
};

export default withAuth(CreateApplication);
