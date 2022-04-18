import React, { FC } from 'react';
import { OnEventFn } from '@rnw-community/shared';
import styles from './SearchBar.module.css';

interface Props {
  onChange: OnEventFn;
  inputValue: string;
}
export const SearchBar: FC<Props> = ({ onChange, inputValue }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={inputValue}
        placeholder="Search ..."
        onChange={onChange}
        className={styles.searchInput}
      />
    </div>
  );
};
