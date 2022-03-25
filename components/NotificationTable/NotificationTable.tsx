import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NotificationTable.module.css';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { NotificationRow } from '../NotificationRow/NotificationRow';
import { userSelector } from '../../features/authSlice';
import {
  loadNotifications,
  notificationsSelector,
  setNotificationsAction,
} from '../../features/dashboardSlice';

export const NotificationTable: FC = () => {
  const [searchParam, setSearchParam] = useState<string>('');

  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const notifications = useSelector(notificationsSelector);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchParam(e.target.value.toLowerCase());

  useEffect(() => void dispatch(loadNotifications(user.ID)), []);
  useEffect(() => {
    const result = notifications.map((item) => {
      if (
        item.FirstName.toLowerCase().includes(searchParam) ||
        item.LastName.toLowerCase().includes(searchParam) ||
        item.Description.toLowerCase().includes(searchParam) ||
        item.DateAdded.toLowerCase().includes(searchParam)
      ) {
        return { ...item, isShown: true };
      }
      return { ...item, isShown: false };
    });
    dispatch(setNotificationsAction(result));
  }, [searchParam]);

  return (
    <div className={styles.wrapper}>
      <DealerHeader />

      <div className={styles.title}>
        <div className={styles.titleLeft}>
          <FontAwesomeIcon
            icon={faBell as IconProp}
            color="#154F85"
            className={styles.icon}
          />
          <h3>Notifications</h3>
        </div>

        <h5 className={styles.applicants}>
          Showing {notifications.length} notifications
        </h5>
      </div>
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchbar}
          placeholder="Search..."
          value={searchParam}
          onChange={handleSearchChange}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th />
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((item) => (
            <NotificationRow {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
