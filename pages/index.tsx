import React, { useEffect } from 'react';
import { Collections, Layout } from '../components';
import auth from '../services/auth';
import { useAppSelector } from '../app/hooks';
import { userSelector } from '../features/authSlice';

const IndexPage: React.FC = () => {
  const user = useAppSelector(userSelector);
  console.log(user);
  // @ts-ignore
  useEffect(() => {
    (async () => {
      const user = await auth.getUser();
      console.log(user);
    })();
  });

  return (
    <Layout title="Curated Collections">
      <Collections />
    </Layout>
  );
};

export default IndexPage;
