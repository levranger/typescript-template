import React, { FC } from 'react';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import cx from 'classnames';
import { cs, OnEventFn, StyleType } from '@rnw-community/shared';
import { hasErrors } from '../../utils/hasErrors';
import styles from './EditDealerApplication.module.css';

interface GenericPropsInterface {
  name: string;
  className: StyleType;
  placeholder?: string;
}
const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  MiddleName: Yup.string().trim(),
  Email: Yup.string().trim().required('Email is required'),
  SSN: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  DOB: Yup.date().max(new Date(2004, 1, 1)).required(),
  MonthlyIncome: Yup.number().required('Monthly income is required'),
  MonthlyExpense: Yup.number().required('Monthly expenses is required'),
  EmailAddress: Yup.string().trim().required('EmailAddress is required'),
  CellPhone: Yup.string().trim().required('Phone number is required'),
  DriverLicense: Yup.string().trim().required('Driver license is required'),
  Address: Yup.string().trim().required('Address is required'),
  City: Yup.string().trim().required('City is required'),
  State: Yup.string().trim().required('State is required'),
  ZipCode: Yup.string().trim().required('Zip code is required'),
  HousingStatus: Yup.string().trim().required('Housing status is required'),
  TimeAtAddress: Yup.number().required('Time at this address is required'),
  MonthlyPayment: Yup.number().required('Monthly housing payment is required'),
  CompanyName: Yup.string().trim().required('Company name is required'),
  WorkPhone: Yup.string().trim().required('Work phone is required'),
  Position: Yup.string().trim().required('Position is required'),
  EmploymentStatus: Yup.string()
    .trim()
    .required('Employment status is required'),
  YearsAtCompany: Yup.number().required('Years at company is required'),
  VIN: Yup.string().trim().required('VIN is required'),
  Year: Yup.number().required('Year is required'),
  Make: Yup.string().trim().required('Make is required'),
  Model: Yup.string().trim().required('Model is required'),
  Mileage: Yup.number().required('Mileage is required'),
  Engine: Yup.number(),
  Transmission: Yup.string().required('Transmission is required'),
  Color: Yup.string().trim(),
  PurchasePrice: Yup.number().required('Purchase price is required'),
  Deposit: Yup.number().required('Deposit is required'),
  AmountFinanced: Yup.number().required('Amount financed is required'),
});

const DatePickerField: FC<GenericPropsInterface> = ({ name, className }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <DatePicker
      selected={field.value}
      className={className}
      dateFormatCalendar="MMM yyyy"
      minDate={new Date(1990)}
      maxDate={new Date()}
      showYearDropdown
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export const MaskedInput: FC<GenericPropsInterface> = ({
  placeholder,
  name,
  className,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(name);

  return (
    <InputMask
      {...field}
      type="text"
      onBlur={(e) => setFieldValue(field.name, e.target.value, true)}
      name="CellPhone"
      mask="999-999-9999"
      placeholder={placeholder}
      className={className}
      onChange={(e) => {
        setFieldValue(field.name, e.target.value, true);
        setFieldTouched(field.name);
      }}
    />
  );
};

export const EditDealerApplication: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Update Account (Profile #)</h1>
        <button>Notes</button>
      </div>

      <div className={styles.steps}>
        <div>
          <h4>Approval Code</h4>
          <p>01</p>
        </div>
        <h4>10001</h4>
      </div>
      <Formik
        validationSchema={validationSchema}
        validateOnBlur
        initialValues={{
          FirstName: '',
          MiddleName: '',
          LastName: '',
          CellPhone: '',
          Email: '',
          SSN: '',
          DOB: new Date(),
          Address: '',
          City: '',
          State: '',
          ZipCode: '',
          HousingStatus: '',
          TimeAtAddress: 0,
          MonthlyPayment: 0,
          CompanyName: '',
          WorkPhone: '',
          Position: '',
          EmploymentStatus: '',
          YearsAtCompany: 0,
          MonthlyIncome: 0,
          VIN: '',
          Year: 0,
          Make: '',
          Model: '',
          Mileage: 0,
          Engine: 0,
          Transmission: '',
          Color: '',
          PurchasePrice: 0,
          Deposit: 0,
          AmountFinanced: 0,
        }}
      >
        {({ errors, touched, initialValues, values }) => {
          const firstNameHasErrors = hasErrors(
            touched.FirstName,
            errors.FirstName
          );
          const LastNameHasErrors = hasErrors(
            touched.LastName,
            errors.LastName
          );
          const ssnHasErrors = hasErrors(touched.SSN, errors.SSN);
          // @ts-ignore
          const DOBHasErrors = hasErrors(touched.DOB, errors.DOB);
          const MonthlyIncomeHasErrors = hasErrors(
            touched.MonthlyIncome,
            errors.MonthlyIncome
          );
          const MonthlyExpenseHasErrors = hasErrors(
            touched.MonthlyExpense,
            errors.MonthlyExpense
          );
          const EmailAddressHasErrors = hasErrors(
            touched.EmailAddress,
            errors.EmailAddress
          );
          const phoneHasErrors = hasErrors(touched.CellPhone, errors.CellPhone);
          const inputErrorStyle = (hasError: boolean): StyleType =>
            cs(
              hasError,
              cx(styles.errorInput, styles.input) as StyleType,
              styles.input as StyleType
            );
          return (
            <Form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="FirstName">First name</label>
                  <Field
                    placeholder="First name"
                    name="FirstName"
                    type="text"
                    className={inputErrorStyle(firstNameHasErrors)}
                  />
                  {firstNameHasErrors && (
                    <div className={styles.error}>{errors.FirstName}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MiddleName">Middle name</label>
                  <Field
                    placeholder="Middle name"
                    name="MiddleName"
                    type="text"
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label htmlFor="LastName">Last name</label>
                  <Field
                    name="LastName"
                    type="text"
                    placeholder="Last name"
                    className={inputErrorStyle(LastNameHasErrors)}
                  />
                  {LastNameHasErrors && (
                    <div className={styles.error}>{errors.LastName}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="EmailAddress">EmailAddress</label>
                  <Field
                    placeholder="EmailAddress"
                    name="EmailAddress"
                    type="text"
                    className={inputErrorStyle(EmailAddressHasErrors)}
                  />
                  {EmailAddressHasErrors && (
                    <div className={styles.error}>{errors.EmailAddress}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="CellPhone">Phone number</label>
                  <MaskedInput
                    name="CellPhone"
                    placeholder="Phone number"
                    className={inputErrorStyle(phoneHasErrors)}
                  />
                  {phoneHasErrors && (
                    <div className={styles.error}>{errors.CellPhone}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="SSN">SSN#*</label>
                  <Field
                    placeholder="SSN"
                    name="SSN"
                    type="number"
                    className={inputErrorStyle(ssnHasErrors)}
                  />
                  {ssnHasErrors && (
                    <div className={styles.error}>{errors.SSN}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="Driver License">Driver License</label>
                  <Field
                    placeholder="Driver License"
                    name="DriverLicense"
                    type="number"
                    className={inputErrorStyle(ssnHasErrors)}
                  />
                  {ssnHasErrors && (
                    <div className={styles.error}>{errors.SSN}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="DOB">DOB</label>
                  <DatePickerField
                    name="DOB"
                    className={inputErrorStyle(DOBHasErrors)}
                  />
                  {DOBHasErrors && (
                    <div className={styles.error}>{errors.DOB}</div>
                  )}
                </div>
              </div>
              <div className={styles.docs}>
                <div>
                  <h2>Upload Documents</h2>
                  <p>02</p>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="MonthlyIncome">Monthly income</label>
                    <Field
                      placeholder="Monthly income"
                      name="MonthlyIncome"
                      type="number"
                      className={inputErrorStyle(MonthlyIncomeHasErrors)}
                    />
                    {MonthlyIncomeHasErrors && (
                      <div className={styles.error}>{errors.MonthlyIncome}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.docs}>
                <div>
                  <h2>Residence Details</h2>
                  <p>04</p>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="MonthlyIncome">Primary Address</label>
                    <Field
                      placeholder="Monthly income"
                      name="MonthlyIncome"
                      type="number"
                      className={inputErrorStyle(MonthlyIncomeHasErrors)}
                    />
                    <Field
                      name="MonthlyIncome"
                      type="number"
                      className={inputErrorStyle(MonthlyIncomeHasErrors)}
                    />
                    {MonthlyIncomeHasErrors && (
                      <div className={styles.error}>{errors.MonthlyIncome}</div>
                    )}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="MonthlyIncome">Monthly income</label>
                    <Field
                      placeholder="Monthly income"
                      name="MonthlyIncome"
                      type="number"
                      className={inputErrorStyle(MonthlyIncomeHasErrors)}
                    />
                    {MonthlyIncomeHasErrors && (
                      <div className={styles.error}>{errors.MonthlyIncome}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">City</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">State</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Zip Code</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Housing Status</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Time at this address</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Monthly Housing Payment</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>

              <div className={styles.docs}>
                <div>
                  <h2>Employment Details</h2>
                  <p>05</p>
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Company Name</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Work Phone</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Position</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Employment Status</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Years at company</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Monthly income</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.docs}>
                <div>
                  <h2>Vehicle Details</h2>
                  <p>05</p>
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">17 Digits VIN</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Year</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Make</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Model</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Mileage</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Engine</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Transmission</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Color</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Purchase Price</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Deposit</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="MonthlyIncome">Amount Financed</label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit">SAVE</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
