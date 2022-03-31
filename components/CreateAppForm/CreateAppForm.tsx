import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CreateAppForm.module.css';

export const CreateAppForm: FC = () => {
  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.title}>
        <FontAwesomeIcon
          icon={faUserPlus as IconProp}
          color="#154F85"
          className={styles.icon}
        />
        <h3>Create Account</h3>
      </div>
    </div>
  );
};
