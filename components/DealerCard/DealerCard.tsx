import React, { FC } from 'react';
import styles from './DealerCard.module.css';

interface Props {
  Address: string;
  City: string;
  Name: string;
  Phone: string;
  State: string;
  idx: number;
}

export const DealerCard: FC<Props> = ({
  Name,
  Address,
  City,
  State,
  Phone,
  idx,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardBody}>
        <p>
          {idx + 1} <a href="https://google.com">{Name}</a>
        </p>
        <p>{Address}</p>
        <p>
          {City}, {State}
        </p>
        <p>{Phone}</p>
      </div>
      <img
        src="https://tlc.3nom.com/dist/assets/ae448319c837d52fd033608b37acce20.png"
        alt="car"
      />
    </div>
  );
};
