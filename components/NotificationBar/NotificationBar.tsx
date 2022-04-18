import React, { FC } from 'react';
import styles from './NotificationBar.module.css';
import { NotificationInterface } from '../../contracts';

type Props = Partial<NotificationInterface>;

export const NotificationBar: FC<Props> = ({
  FirstName,
  LastName,
  Description,
  DateAdded,
}) => {
  return (
    <div className={styles.wrapper}>
      <h6 className={styles.username}>
        {FirstName}
        {LastName}
      </h6>
      <p>{Description}</p>

      <p className={styles.date}>{DateAdded}</p>
    </div>
  );
};
