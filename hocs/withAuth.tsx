import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isDefined } from '@rnw-community/shared';
import { logoutAction, userSelector } from '../features/authSlice';

const parseJwt = (token: string): { exp: number; iss: string; aud: string } => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const withAuth =
  (Component: FC) =>
  ({ ...props }) => {
    const dispatch = useDispatch();

    const user = useSelector(userSelector);

    const router = useRouter();

    useEffect(() => {
      if (!isDefined(user)) router.push('/');
    }, [user]);

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      const parsedJwt = parseJwt(token);
      if (parsedJwt.exp * 1000 < Date.now()) {
        dispatch(logoutAction());
      }
    }, []);

    return <Component {...props} />;
  };
