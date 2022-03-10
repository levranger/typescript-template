import React, { FC } from 'react';
import styles from './Directories.module.css';
import { DirectoryCard } from '../DirectoryCard/DirectoryCard';

export const Directories: FC = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.breadcrumb}>Folder</span>
      <span className={styles.breadcrumb}>►</span>
      <span className={styles.breadcrumb}>Folder</span>
      <span className={styles.breadcrumb}>►</span>
      <span className={styles.breadcrumb}>Folder</span>
      <div className={styles.cardsWrapper}>
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
        <DirectoryCard />
      </div>
    </div>
  );
};
