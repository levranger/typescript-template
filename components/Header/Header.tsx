import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import styles from './Header.module.css';
import auth from '../../services/auth';

export const Header: FC = () => {
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
          <div className={styles.button}>Advanced search</div>
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

      <div
        onClick={handleLoginPress}
        className={[styles.button, styles.adminLoginButton].join(' ')}
      >
        Admin login
      </div>
    </div>
  );
};
