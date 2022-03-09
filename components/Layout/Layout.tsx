import React, { FC } from 'react';
import styles from './Layout.module.css';

export const Layout: FC = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);
