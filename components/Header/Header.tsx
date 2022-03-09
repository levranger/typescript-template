import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import styles from './Header.module.css';
import {faSearch} from "@fortawesome/fontawesome-free-solid";
import {IconProp} from "@fortawesome/fontawesome";

export const Header: FC = () => (
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
        <div className={styles.button}>Browse By Directory</div>
        <div className={styles.button}>Advanced search</div>
      </div>
    </div>

    <div className={styles.searchContainer}>
        {/*// @ts-ignore*/}
        <FontAwesomeIcon icon={faSearch as IconProp} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Quick Search"
      />
      <div className={styles.button}>Go</div>
    </div>

    <div className={[styles.button, styles.adminLoginButton].join(' ')}>
      Admin login
    </div>
  </div>
);
