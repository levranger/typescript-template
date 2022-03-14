import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth from '../services/auth';
import { setUser } from '../features/authSlice';
import { useAppDispatch } from '../app/hooks';

const SigninOidc: FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  // @ts-ignore
  useEffect(async () => {
    await auth.loginCallback();
    const userInfo = await auth.getUser();
    dispatch(setUser(userInfo));
    auth.setTokenToHeader(userInfo.access_token);
    router.push('/');
  }, []);

  return <div>SIGN IN OIDC</div>;
};

export default SigninOidc;
