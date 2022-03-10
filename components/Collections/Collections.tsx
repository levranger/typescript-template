import React, { FC } from 'react';
import style from './Collections.module.css';
import { CollectionCard } from '../CollectionCard/CollectionCard';

export const Collections: FC = () => {
  return (
    <div className={style.wrapper}>
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
    </div>
  );
};
