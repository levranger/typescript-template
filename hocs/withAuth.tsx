import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isDefined } from '@rnw-community/shared';
import { userSelector } from '../features/authSlice';

export const withAuth =
  (Component: FC) =>
  ({ ...props }) => {
    const user = useSelector(userSelector);

    const router = useRouter();

    useEffect(() => {
      if (!isDefined(user)) router.push('/');
    }, [user]);

    return <Component {...props} />;
  };
