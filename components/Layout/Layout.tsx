import React, { FC, useEffect } from 'react';
import { isDefined } from '@rnw-community/shared';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';
import { Header } from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser, userSelector } from '../../features/authSlice';
import auth from '../../services/auth';

interface Props {
  title: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!isDefined(user)) {
      (async () => {
        const userData = await auth.getUser();
        dispatch(setUser(userData));
      })();
    }
  }, []);

  const handleLogout = (): void => {
    void auth.logout();
    dispatch(setUser(null));
    void router.push('/');
  };

  const isLoggedIn = isDefined(user);

  return (
    <div className={styles.layout}>
      <Header isLoggedIn={isLoggedIn} onLogoutPress={handleLogout} />
      <span className={styles.title}>{title}</span>
      {children}
    </div>
  );
};
