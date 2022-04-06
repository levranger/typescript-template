import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ApplicationForm, Layout } from '../components';
import { AddUserArgsInterface, AddUserPayloadInterface } from '../contracts';
import { addUser, approvalCodeSelector } from '../features/authSlice';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const approvalCode = useSelector(approvalCodeSelector);

  useEffect(() => {
    if (typeof approvalCode === 'number') {
      router.push('/approved');
    }
  }, []);

  const handleSubmit = (values: AddUserPayloadInterface): void =>
    void dispatch(addUser({ payload: values, router }));
  return (
    <Layout>
      <ApplicationForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default IndexPage;
