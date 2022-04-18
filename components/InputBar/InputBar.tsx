import { Field } from 'formik';
import React, { FC } from 'react';
import { cs, StyleType } from '@rnw-community/shared';
import cx from 'classnames';
import styles from './InputBar.module.css';

interface Props {
  title: string;
  name?: string;
  hasError: boolean;
  error: string;
}

export const InputBar: FC<Props> = ({ title, name, hasError, error }) => {
  const inputErrorStyle = (err: boolean): StyleType =>
    cs(
      err,
      cx(styles.errorInput, styles.input) as StyleType,
      styles.input as StyleType
    );

  return (
    <div className={styles.inputBar}>
      <span>{title}</span>
      <Field
        name={name}
        placeholder={title}
        className={inputErrorStyle(hasError)}
      />
      {hasError && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
