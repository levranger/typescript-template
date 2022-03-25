import React from 'react';
import { Header, Footer, ApplicationForm, Layout } from '../components';
import styles from './styles/index.module.css';

const IndexPage: React.FC = ({ user }) => {
  return (
    <Layout>
      <ApplicationForm />
    </Layout>
  );
};

export default IndexPage;
