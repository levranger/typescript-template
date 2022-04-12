import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAppForm, Sidebar } from '../components';
import { withAuth } from '../hocs';
import styles from './styles/create-application.module.css';
import { loadStates, stateSelector } from '../features/adminDashboardSlice';

const CreateApplication: FC = () => {
  const dispatch = useDispatch();

  const states = useSelector(stateSelector);

  useEffect(() => void dispatch(loadStates()), []);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <CreateAppForm states={states} />
    </div>
  );
};

export default withAuth(CreateApplication);
