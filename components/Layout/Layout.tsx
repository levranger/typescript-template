import React, { FC } from 'react';
import styles from './Layout.module.css';
import {Header} from "../Header/Header";
interface Props {
    title: string
}

export const Layout: FC<Props> = ({ children, title }) => (
  <div className={styles.layout}>
      <Header/>
      <span className={styles.title}>{title}</span>
      {children}
  </div>
);
