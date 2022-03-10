import React, { FC } from 'react';
import cx from 'classnames';
import { cs, isDefined, OnEventFn, StyleType } from '@rnw-community/shared';
import { Field, Form, Formik, FormikErrors, FormikValues } from 'formik';
import * as Yup from 'yup';
import style from './FileDescription.module.css';

interface Props {
  fileId: string;
  archiveId: string;
  description: string;
  onSubmit: OnEventFn;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('email is required'),
  comment: Yup.string()
    .min(2, 'Comment must be larger')
    .required('comment is required'),
});

const hasErrors = (
  isTouched: boolean,
  hasError: keyof FormikErrors<FormikValues>
): boolean => isDefined(isTouched && hasError);

export const FileDescription: FC<Props> = ({
  fileId,
  archiveId,
  description,
  onSubmit,
}) => {
  return (
    <div className={style.imageDetails}>
      <span>Archive ID: {archiveId}</span> <br />
      <span>Filename: Image {fileId}.jpg</span>
      <br />
      <span>
        Tags: <span className={style.tag}>Genre: Speeches</span>{' '}
        <span className={style.tag}>Event: 11th Syim Hashas</span>
      </span>
      <br />
      <p>
        People: <span className={style.tag}>R. ____</span>
        <span className={style.tag}>R. ____</span>
      </p>
      <span>
        Folder
        <span className={style.tag}>/C/Desktop/files/blabla/{fileId}.jpg</span>
      </span>
      <div className={style.descriptionBlock}>{description}</div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ name: '', email: '', comment: '' }}
        onSubmit={(values, { resetForm }) => {
          alert(JSON.stringify(values));
          resetForm();
        }}
      >
        {({ submitForm, errors, touched, initialValues }) => {
          const nameHasError = hasErrors(touched.name, errors.name);
          const emailHasError = hasErrors(touched.email, errors.email);
          const commentHasError = hasErrors(touched.comment, errors.comment);

          const inputErrorStyle = (hasError: boolean): StyleType =>
            cs(hasError, style.errorInput, style.input);

          return (
            <Form className={style.formWrapper}>
              <Field
                name="name"
                type="text"
                className={inputErrorStyle(nameHasError)}
                placeholder="Name"
              />
              {nameHasError && (
                <span className={style.errorMessage}>{errors.name}</span>
              )}
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className={inputErrorStyle(emailHasError)}
              />
              {emailHasError && (
                <span className={style.errorMessage}>{errors.email}</span>
              )}
              <Field
                name="comment"
                placeholder="Comment"
                render={({ field }) => (
                  <textarea
                    placeholder="Comment"
                    {...field}
                    className={cx(style.commentInput, style.input)}
                  />
                )}
              />
              {commentHasError && (
                <span className={style.errorMessage}>{errors.comment}</span>
              )}
              <div onClick={submitForm} className={style.button}>
                Add comment
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
