import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChevronCircleDown,
  faChevronDown,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './DealerHeader.module.css';
import { isAuthorizedSelector, logoutAction } from '../../features/authSlice';
import { NotificationBar } from '../NotificationBar/NotificationBar';
import { notificationsSelector } from '../../features/dashboardSlice';

export const DealerHeader: FC = () => {
  const [isLogoutPanelExpanded, setIsLogoutPanelExpanded] =
    useState<boolean>(false);
  const [isNotificationPanelExpanded, setIsNotificationPanelExpanded] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const notifications = useSelector(notificationsSelector);

  const toggleSignoutPanel = (): void =>
    setIsLogoutPanelExpanded(!isLogoutPanelExpanded);
  const toggleNotificationPanel = (): void =>
    setIsNotificationPanelExpanded(!isNotificationPanelExpanded);

  const handleLogout = (): void => void dispatch(logoutAction());

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.pageTitle}>Dealer</h3>
      <div className={styles.profileContainer}>
        <FontAwesomeIcon
          onClick={toggleNotificationPanel}
          icon={faBell as IconProp}
          className={styles.icon}
          color="green"
        />
        <div className={styles.profileIcon}>LP</div>
        <h5 className={styles.username}>lana pant</h5>
        <FontAwesomeIcon
          onClick={toggleSignoutPanel}
          icon={faChevronDown as IconProp}
          className={styles.chevronIcon}
          color="green"
        />
      </div>
      {isLogoutPanelExpanded && (
        <div onClick={handleLogout} className={styles.logoutPanel}>
          Logout
        </div>
      )}
      {isNotificationPanelExpanded && (
        <div className={styles.notificationPanel}>
          <p>10 Notifications</p>
          <div className={styles.panel}>
            {notifications.map((item) => (
              <NotificationBar {...item} />
            ))}
          </div>
          <Link href="/dealer-notification">
            <p
              onClick={toggleNotificationPanel}
              className={styles.showMessages}
            >
              Show all messages
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};
