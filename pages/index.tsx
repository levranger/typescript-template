import React from 'react';
import { Header, Footer, ApplicationForm } from '../components';
import styles from './styles/index.module.css';

const IndexPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <ApplicationForm />
      <Footer />
    </div>
  );
};

export default IndexPage;
