import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { isString } from '@rnw-community/shared';
import { Layout, FileDescription } from '../../components';
import style from './Image.module.css';

const Image: FC = () => {
  const router = useRouter();

  const { id } = router.query;

  if (!isString(id)) {
    return <Layout title="Something went wrong" />;
  }

  return (
    <Layout title={`Image ${id}.jpg`}>
      <div className={style.wrapper}>
        <div className={style.imageWrapper}>
          <img
            className={style.img}
            src="https://www.robinwieruch.de/logo.svg"
            alt="image"
          />
        </div>
        <FileDescription
          fileId={id}
          archiveId={id}
          description="JNikowc"
          onSubmit={() => console.log('kek')}
        />
      </div>
    </Layout>
  );
};

export default Image;
