import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import styles from './DashboardBox.module.css';
import { DashboardBoxEnum } from '../../contracts';

interface Props {
  icon: IconProp;
  text: string;
  count: number;
  type: DashboardBoxEnum;
}

export const getTextStyle = (type: DashboardBoxEnum): string => {
  switch (type) {
    case DashboardBoxEnum.Failed:
      return styles.textFailed;

    case DashboardBoxEnum.Pending:
      return styles.textPending;

    case DashboardBoxEnum.Success:
      return styles.textSuccess;

    case DashboardBoxEnum.Notification:
      return styles.textNotification;
    default:
      return '';
  }
};

const getIconStyle = (type: DashboardBoxEnum): string => {
  switch (type) {
    case DashboardBoxEnum.Failed:
      return cx(styles.iconFailed, styles.iconWrapper);

    case DashboardBoxEnum.Pending:
      return cx(styles.iconPending, styles.iconWrapper);

    case DashboardBoxEnum.Success:
      return cx(styles.iconSuccess, styles.iconWrapper);

    default:
      return '';
  }
};

export const DashboardBox: FC<Props> = ({ icon, text, count, type }) => {
  return (
    <div className={styles.wrapper}>
      <div className={getIconStyle(type)}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <span>{text}</span> <br />
        <h2 className={getTextStyle(type)}> {count} </h2>
      </div>
    </div>
  );
};
