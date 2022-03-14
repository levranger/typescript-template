import React, { FC } from 'react';
import { OnEventFn } from '@rnw-community/shared';
import { useRouter } from 'next/router';
import style from './DirectoryCard.module.css';

interface Props {
  onClick?: OnEventFn;
}

export const DirectoryCard: FC<Props> = ({ onClick = '' }) => {
  const router = useRouter();

  const handleClick = (): void =>
    void router.push(`/images/${Math.round(Math.random() * 100)}`);

  return (
    <div onClick={handleClick} className={style.cardWrapper}>
      Directory
    </div>
  );
};
