import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikValues,
  useField,
  useFormikContext,
} from 'formik';
import InputMask, { TextField } from 'react-input-mask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import styles from './CreateAppForm.module.css';

const validationSchema = Yup.object({
  approvalCode: Yup.string().trim().required('Approval Code is required'),
  firstName: Yup.string().trim().required('First name is required'),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim().required('Last name is required'),
  phoneNumber: Yup.string().trim().required('Phone number is required'),
  email: Yup.string().trim().required('Email is required'),
  ssn: Yup.string()
    .trim()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  driversLicense: Yup.string().trim().required('Driver license is required'),
  dob: Yup.date().required(),
  primaryAddress: Yup.string().trim().required('Address is required'),
  city: Yup.string().trim().required('City is required'),
  state: Yup.string().trim().required('State is required'),
  zipCode: Yup.string().trim().required('Zip code is required'),
  housingStatus: Yup.string().trim().required('Housing status is required'),
  timeAddress: Yup.string().trim().required('Time at address is required'),
  monthlyPayment: Yup.string()
    .trim()
    .required('Monthly housing payment is required '),
  companyName: Yup.string().trim().required('Company name is required'),
  workPhone: Yup.string().trim().required('Work phone is required'),
  position: Yup.string().trim().required('Position is required'),
  employmentStatus: Yup.string()
    .trim()
    .required('Employment status is required'),
  yearsCompany: Yup.string().trim().required('Years at company is required'),
  monthlyIncome: Yup.string().trim().required('Monthly Income is required'),
  vin: Yup.string().trim().required('VIN is required'),
  year: Yup.string().trim().required('Year is required'),
  make: Yup.string().trim().required('Make is required'),
  model: Yup.string().trim().required('Model is required'),
  mileage: Yup.string().trim().required('Mileage is required'),
  engine: Yup.string().trim(),
  transmission: Yup.string().trim().required('Transmission is required'),
  color: Yup.string().trim(),
  purchasePrice: Yup.string().trim().required('Purchase price is required'),
  deposit: Yup.string().trim().required('Deposit is required'),
  amountFinanced: Yup.string().trim().required('Amount financed is required'),
});

export const CreateAppForm: FC = () => {
  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.title}>
        <FontAwesomeIcon
          icon={faUserPlus as IconProp}
          color="#154F85"
          className={styles.icon}
        />
        <h3>Create Account</h3>
      </div>
    </div>
  );
};
