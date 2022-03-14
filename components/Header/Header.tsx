import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import cx from 'classnames';
import { OnEventFn } from '@rnw-community/shared';
import styles from './Header.module.css';
import auth from '../../services/auth';

interface Props {
  isLoggedIn: boolean;
  onLogoutPress: OnEventFn;
}

export const Header: FC<Props> = ({ isLoggedIn, onLogoutPress }) => {
  const handleLoginPress = (): Promise<void> => void auth.login();

  return (
    <div className={styles.header}>
      <span className={styles.mobileLogo}>
        Agudah
        <br />
        Archives
      </span>
      <div className={styles.leftBar}>
        <span className={styles.logo}>
          Agudah
          <br />
          Archives
        </span>
        <div className={styles.buttonContainer}>
          <Link href="/directory-browsing">
            <div className={styles.button}>Browse By Directory</div>
          </Link>
          <Link href="/">
            <div className={styles.button}>Advanced search</div>
          </Link>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <FontAwesomeIcon
          icon={faSearch as IconProp}
          className={styles.searchIcon}
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Quick Search"
        />

        <div className={styles.button}>Go</div>
      </div>
      {!isLoggedIn ? (
        <div
          onClick={handleLoginPress}
          className={cx(styles.button, styles.adminLoginButton)}
        >
          Admin login
        </div>
      ) : (
        <div
          onClick={onLogoutPress}
          className={cx(styles.button, styles.adminLoginButton)}
        >
          Admin logout
        </div>
      )}
    </div>
  );
};
