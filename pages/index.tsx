import React from 'react';
import { Collections, Layout } from '../components';

const IndexPage: React.FC = () => {
  return (
    <Layout title="Curated Collections">
      <Collections />
    </Layout>
  );
};

export default IndexPage;
