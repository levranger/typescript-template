import React, { FC } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import Logo from '../../assets/logo.png';

export const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image src={Logo} width={90} height={65} />
        <div className={styles.navbar}>
          <span>Home</span>
          <span>Inventory</span>
          <span>Financing info</span>
          <span>Blog</span>
          <span>Contact us</span>
          <span>Login</span>
        </div>
        <div>
          Apply <br />
          Now
        </div>
      </div>
    </div>
  );
};
