import React, { FC } from 'react';
import Image from 'next/image';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikValues,
  useField,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';
import { cs, StyleType } from '@rnw-community/shared';
import cx from 'classnames';
import styles from './styles/dealer-login.module.css';
import Logo from '../assets/images/logo.png';
import car from '../assets/images/img.png';
import { hasErrors } from '../utils/hasErrors';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
});

const DealerLogin: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Image src={Logo} />
      <div className={styles.formContainer}>
        <div className={styles.left}>
          <h3>Login</h3>
          <p>
            Welcome to lorem ipsum dolor sit amet, consetetur sadispscing elitr.
          </p>
          <Formik
            validationSchema={validationSchema}
            validateOnChange
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={(values) => alert(JSON.stringify(values))}
          >
            {({ submitForm, errors, touched, initialValues, values }) => {
              const usernameHasErrors = hasErrors(
                touched.username,
                errors.username
              );
              const passwordHasErrors = hasErrors(
                touched.password,
                errors.password
              );
              const inputErrorStyle = (hasError: boolean): StyleType =>
                cs(
                  hasError,
                  cx(styles.errorInput, styles.input) as StyleType,
                  styles.input as StyleType
                );
              return (
                <Form className={styles.form}>
                  <label>Username</label>
                  <Field
                    name="username"
                    placeholder="username"
                    className={inputErrorStyle(usernameHasErrors)}
                  />
                  {usernameHasErrors && (
                    <div className={styles.error}>{errors.username}</div>
                  )}
                  <label>Password</label>
                  <Field
                    placeholder="password"
                    name="password"
                    className={inputErrorStyle(passwordHasErrors)}
                  />
                  {passwordHasErrors && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                  <button type="submit">LOGIN</button>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className={styles.right}>
          <Image src={car} />
        </div>
        <div />
      </div>
    </div>
  );
};

export default DealerLogin;