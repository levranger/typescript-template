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
      <div className={styles.headerContainer}>
        <h1 className={styles.blue}>Update Account (Profile #)</h1>
        <div className={styles.buttonContainer2}>
          <button type="submit">SAVE</button>
        </div>
      </div>

      <div className={styles.steps01}>
        <h4 className={styles.margeR}>01 Approval Code</h4>

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
          const CellPhoneHasErrors = hasErrors(
            touched.CellPhone,
            errors.CellPhone
          );

          const CityHasErrors = hasErrors(touched.City, errors.City);
          const StateHasErrors = hasErrors(touched.State, errors.State);
          const ZipCodeHasErrors = hasErrors(touched.ZipCode, errors.ZipCode);
          const HousingStatusHasErrors = hasErrors(
            touched.HousingStatus,
            errors.HousingStatus
          );
          const TimeAtAddressHasErrors = hasErrors(
            touched.TimeAtAddress,
            errors.TimeAtAddress
          );
          const MonthlyPaymentHasErrors = hasErrors(
            touched.MonthlyPayment,
            errors.MonthlyPayment
          );
          const CompanyNameHasErrors = hasErrors(
            touched.CompanyName,
            errors.CompanyName
          );
          const WorkPhoneHasErrors = hasErrors(
            touched.WorkPhone,
            errors.WorkPhone
          );
          const PositionHasErrors = hasErrors(
            touched.Position,
            errors.Position
          );
          const EmploymentStatusHasErrors = hasErrors(
            touched.EmploymentStatus,
            errors.EmploymentStatus
          );
          const YearsAtCompanyHasErrors = hasErrors(
            touched.YearsAtCompany,
            errors.YearsAtCompany
          );

          const VINHasErrors = hasErrors(touched.VIN, errors.VIN);
          const YearHasErrors = hasErrors(touched.Year, errors.Year);
          const MakeHasErrors = hasErrors(touched.Make, errors.Make);
          const ModelHasErrors = hasErrors(touched.Model, errors.Model);

          const MileageHasErrors = hasErrors(touched.Mileage, errors.Mileage);
          const EngineHasErrors = hasErrors(touched.Engine, errors.Engine);
          const TransmissionHasErrors = hasErrors(
            touched.Transmission,
            errors.Transmission
          );
          const ColorHasErrors = hasErrors(touched.Color, errors.Color);
          const PurchasePriceHasErrors = hasErrors(
            touched.PurchasePrice,
            errors.PurchasePrice
          );
          const DepositHasErrors = hasErrors(touched.Deposit, errors.Deposit);
          const AmountFinancedHasErrors = hasErrors(
            touched.AmountFinanced,
            errors.AmountFinanced
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
              <div className={styles.steps}>
                <p>02</p>
                <h2>Personal Details</h2>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="FirstName">
                    First name <span className={styles.asterisk}>*</span>
                  </label>
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
                  <label className={styles.formLabel} htmlFor="MiddleName">
                    Middle name <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Middle name"
                    name="MiddleName"
                    type="text"
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="LastName">
                    Last name <span className={styles.asterisk}>*</span>
                  </label>
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
                  <label className={styles.formLabel} htmlFor="EmailAddress">
                    Email Address <span className={styles.asterisk}>*</span>
                  </label>
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
                  <label className={styles.formLabel} htmlFor="CellPhone">
                    Phone number <span className={styles.asterisk}>*</span>
                  </label>
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
                  <label className={styles.formLabel} htmlFor="SSN">
                    SSN# <span className={styles.asterisk}>*</span>
                  </label>
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
                  <label className={styles.formLabel} htmlFor="Driver License">
                    Driver License <span className={styles.asterisk}>*</span>
                  </label>
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
                  <label className={styles.formLabel} htmlFor="DOB">
                    DOB <span className={styles.asterisk}>*</span>
                  </label>
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
                <div className={styles.steps}>
                  <h2>Upload Documents</h2>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label className={styles.formLabel} htmlFor="MonthlyIncome">
                      Monthly income <span className={styles.asterisk}>*</span>
                    </label>
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
                <div className={styles.steps}>
                  <p>04</p>
                  <h2>Residence Details</h2>
                </div>

                <div className={styles.row}>
                  <div className={styles.column}>
                    <div className={styles.inputContainer}>
                      <label
                        className={styles.formLabel}
                        htmlFor="MonthlyIncome"
                      >
                        Primary Address{' '}
                        <span className={styles.asterisk}>*</span>
                      </label>
                      <Field
                        placeholder="Address"
                        name="Address"
                        type="text"
                        className={inputErrorStyle(MonthlyIncomeHasErrors)}
                      />
                    </div>
                    <div className={styles.inputContainer2}>
                      <Field
                        name="MonthlyIncome"
                        type="text"
                        className={inputErrorStyle(MonthlyIncomeHasErrors)}
                      />
                      {MonthlyIncomeHasErrors && (
                        <div className={styles.error}>
                          {errors.MonthlyIncome}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="City">
                    City <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="City"
                    name="City"
                    type="text"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="State">
                    State <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="State"
                    name="State"
                    type="text"
                    className={inputErrorStyle(StateHasErrors)}
                  />
                  {StateHasErrors && (
                    <div className={styles.error}>{errors.State}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="ZipCode">
                    Zip Code <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Zip Code"
                    name="ZipCode"
                    type="text"
                    className={inputErrorStyle(ZipCodeHasErrors)}
                  />
                  {ZipCodeHasErrors && (
                    <div className={styles.error}>{errors.ZipCode}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Housing Status">
                    Housing Status <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Housing Status"
                    name="HousingStatus"
                    type="text"
                    className={inputErrorStyle(HousingStatusHasErrors)}
                  />
                  {HousingStatusHasErrors && (
                    <div className={styles.error}>{errors.HousingStatus}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="TimeAtAddress">
                    Time at this address
                    <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Time at this address"
                    name="TimeAtAddress"
                    type="number"
                    className={inputErrorStyle(TimeAtAddressHasErrors)}
                  />
                  {TimeAtAddressHasErrors && (
                    <div className={styles.error}>{errors.TimeAtAddress}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="MonthlyPayment">
                    Monthly Housing Payment
                    <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Monthly Housing Payment"
                    name="MonthlyHousingPayment"
                    type="number"
                    className={inputErrorStyle(MonthlyPaymentHasErrors)}
                  />
                  {MonthlyPaymentHasErrors && (
                    <div className={styles.error}>{errors.MonthlyPayment}</div>
                  )}
                </div>
              </div>

              <div className={styles.docs}>
                <div className={styles.steps}>
                  <p>05</p>
                  <h2>Employment Details</h2>
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="CompanyName">
                    Company Name <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Company Name"
                    name="CompanyName"
                    type="text"
                    className={inputErrorStyle(CompanyNameHasErrors)}
                  />
                  {CompanyNameHasErrors && (
                    <div className={styles.error}>{errors.CompanyName}</div>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="WorkPhone">
                    Work Phone <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Work Phone"
                    name="WorkPhone"
                    type="text"
                    className={inputErrorStyle(WorkPhoneHasErrors)}
                  />
                  {WorkPhoneHasErrors && (
                    <div className={styles.error}>{errors.WorkPhone}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Position">
                    Position <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Position"
                    name="Position"
                    type="text"
                    className={inputErrorStyle(PositionHasErrors)}
                  />
                  {PositionHasErrors && (
                    <div className={styles.error}>{errors.Position}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label
                    className={styles.formLabel}
                    htmlFor="EmploymentStatus"
                  >
                    Employment Status <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Employment Status"
                    name="EmploymentStatus"
                    type="select"
                    className={inputErrorStyle(EmploymentStatusHasErrors)}
                  />
                  {EmploymentStatusHasErrors && (
                    <div className={styles.error}>
                      {errors.EmploymentStatus}
                    </div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="YearsAtCompany">
                    Years at company <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Years at company"
                    name="YearsAtCompany"
                    type="text"
                    className={inputErrorStyle(YearsAtCompanyHasErrors)}
                  />
                  {YearsAtCompanyHasErrors && (
                    <div className={styles.error}>{errors.YearsAtCompany}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="MonthlyIncome">
                    Monthly income <span className={styles.asterisk}>*</span>
                  </label>
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
                <div className={styles.steps}>
                  <p>05</p>
                  <h2>Vehicle Details</h2>
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="VIN">
                    17 Digits VIN <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="VIN"
                    name="VIN"
                    type="number"
                    className={inputErrorStyle(VINHasErrors)}
                  />
                  {VINHasErrors && (
                    <div className={styles.error}>{errors.VIN}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Year">
                    Year <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Year"
                    name="Year"
                    type="number"
                    className={inputErrorStyle(YearHasErrors)}
                  />
                  {YearHasErrors && (
                    <div className={styles.error}>{errors.Year}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Make">
                    Make <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Make"
                    name="Make"
                    type="text"
                    className={inputErrorStyle(MakeHasErrors)}
                  />
                  {MakeHasErrors && (
                    <div className={styles.error}>{errors.Make}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Model">
                    Model <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Model"
                    name="Model"
                    type="text"
                    className={inputErrorStyle(ModelHasErrors)}
                  />
                  {ModelHasErrors && (
                    <div className={styles.error}>{errors.Model}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Mileage">
                    Mileage <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Mileage"
                    name="Mileage"
                    type="text"
                    className={inputErrorStyle(MileageHasErrors)}
                  />
                  {MileageHasErrors && (
                    <div className={styles.error}>{errors.Mileage}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Engine">
                    Engine <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Engine"
                    name="Engine"
                    type="type"
                    className={inputErrorStyle(EngineHasErrors)}
                  />
                  {EngineHasErrors && (
                    <div className={styles.error}>{errors.Engine}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Transmission">
                    Transmission <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Transmission"
                    name="Transmission"
                    type="text"
                    className={inputErrorStyle(TransmissionHasErrors)}
                  />
                  {TransmissionHasErrors && (
                    <div className={styles.error}>{errors.Transmission}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Color">
                    Color <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Color"
                    name="Color"
                    type="text"
                    className={inputErrorStyle(ColorHasErrors)}
                  />
                  {ColorHasErrors && (
                    <div className={styles.error}>{errors.Color}</div>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="PurchasePrice">
                    Purchase Price <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Purchase Price"
                    name="PurchasePrice"
                    type="text"
                    className={inputErrorStyle(PurchasePriceHasErrors)}
                  />
                  {PurchasePriceHasErrors && (
                    <div className={styles.error}>{errors.PurchasePrice}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Deposit">
                    Deposit <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Deposit"
                    name="Deposit"
                    type="number"
                    className={inputErrorStyle(DepositHasErrors)}
                  />
                  {DepositHasErrors && (
                    <div className={styles.error}>{errors.Deposit}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Amount Financed">
                    Amount Financed <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Amount Financed"
                    name="AmountFinanced"
                    type="number"
                    className={inputErrorStyle(AmountFinancedHasErrors)}
                  />
                  {AmountFinancedHasErrors && (
                    <div className={styles.error}>{errors.AmountFinanced}</div>
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
