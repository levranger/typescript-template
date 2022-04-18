import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCar } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { OnEventFn } from '@rnw-community/shared';
import styles from './DealerFormTitleBar.module.css';

interface Props {
  onBack: OnEventFn;
}

export const DealerFormTitleBar: FC<Props> = ({ onBack }) => {
  return (
    <div className={styles.titleBar}>
      <button className={styles.backButton} onClick={onBack}>
        <FontAwesomeIcon
          icon={faArrowLeft as IconProp}
          className={styles.icon}
        />
        Back
      </button>
      <div className={styles.carContainer}>
        <h2>
          <FontAwesomeIcon
            icon={faCar as IconProp}
            className={styles.iconCar}
          />
        </h2>
      </div>
    </div>
  );
};
