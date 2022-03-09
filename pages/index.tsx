import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import auth from '../services/auth';
import { userSelector } from '../features/authSlice';
import { Layout } from '../components/Layout/Layout';

import { Header } from '../components/Header/Header';

const IndexPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);

  useEffect(() => {
    // auth.login();
    // if (typeof window !== 'undefined') {
    //     try {
    //         dispatch(sendLoginRequest())
    //         let res = auth.getUser();
    //         res.then(data =>  dispatch(loginRequestSuccess(data)))
    //     } catch (err) {
    //         dispatch(loginRequestFailed())
    //         console.log(err);
    //     }
    // }
  }, []);

  return (
    <Layout>
      <Header />
    </Layout>
  );
};

export default IndexPage;
