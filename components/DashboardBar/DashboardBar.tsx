import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';
import { isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import styles from './DashboardBar.module.css';
import { DashboardBoxEnum } from '../../contracts';
import { getTextStyle } from '../DashboardBox/DashboardBox';

interface Props {
  icon: IconProp;
  text: string;
  description?: string;
  type: DashboardBoxEnum;
  onNavigate: OnEventFn;
}

export const DashboardBar: FC<Props> = ({
  type,
  icon,
  text,
  description,
  onNavigate,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={getTextStyle(type)}>
          <FontAwesomeIcon className={styles.icon} icon={icon} />
          <span className={styles.label}>{text}</span>
        </span>
        <span className={styles.calendarText}>
          <FontAwesomeIcon icon={faCalendarAlt as IconProp} />
          <span className={styles.calendarTextLabel}>Last 7 days</span>
        </span>
        {isNotEmptyString(description) && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
      <div className={styles.button} onClick={onNavigate}>
        View more
      </div>
    </div>
  );
};
