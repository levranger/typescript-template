import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { isDefined, isString } from '@rnw-community/shared';
import { Layout, FileDescription, ModalFileEdit } from '../../components';
import style from './Image.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeEditMode, editModeSelector } from '../../features/editFileSlice';

const Image: FC = () => {
  const editMode = useAppSelector(editModeSelector);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { id } = router.query;

  const isModalShown = isDefined(editMode);

  const handleModalClose = (): void => void dispatch(changeEditMode(null));

  if (!isString(id)) {
    return <Layout title="Something went wrong" />;
  }

  return (
    <Layout title={`Image ${id}.jpg`}>
      {isModalShown && (
        <ModalFileEdit onClose={handleModalClose} editMode={editMode} />
      )}
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
