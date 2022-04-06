import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCar,
  faCheck,
  faCheckCircle,
  faFile,
  faFilePdf,
  faTimes,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Oval } from 'react-loader-spinner';
import { OnEventFn } from '@rnw-community/shared';
import cx from 'classnames';
import { Field, Form, Formik } from 'formik';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './EditDelaerContent.module.css';
import { ApplicationInterface, ContractInterface } from '../../contracts';

interface Props {
  application: ApplicationInterface;
  pending: boolean;
  onBackPress: OnEventFn;
  contractTypes: ContractInterface[];
}

export const EditDealerContent: FC<Props> = ({
  application,
  onBackPress,
  pending,
  contractTypes,
}) => {
  console.log(application);
  const statusStyle = {
    'Awaiting Approval': styles.orange,
    Approved: styles.green,
    Incomplete: styles.red,
  }[application?.Status];

  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      {pending && (
        <div className={styles.loaderWrapper}>
          <Oval
            secondaryColor="black"
            wrapperClass={styles.loader}
            width={80}
            height={80}
            color="black"
          />
        </div>
      )}
      {!pending && (
        <div className={styles.content}>
          <div className={styles.title}>
            <div>
              <FontAwesomeIcon icon={faFile as IconProp} />
              <span>{application?.ApplicationID}</span>
              <span className={statusStyle}>{application?.Status}</span>
              <span>{`${application?.FirstName} ${application?.LastName}`}</span>
            </div>
            <p>
              <FontAwesomeIcon icon={faCar as IconProp} />
              {application?.Dealership}
            </p>
          </div>
          <div className={styles.dashboardBar}>
            <div className={styles.backButton} onClick={onBackPress}>
              <FontAwesomeIcon icon={faArrowLeft as IconProp} /> Back
            </div>
            <div className={styles.buttonContainer}>
              <select className={styles.select}>
                {contractTypes.map((item) => (
                  <option value={item.Name}>{item.Name}</option>
                ))}
              </select>
              <div className={cx(styles.generatePdf, styles.button)}>
                <FontAwesomeIcon icon={faFilePdf as IconProp} /> Generate pdf
              </div>
              <div className={cx(styles.save, styles.button)}>
                <FontAwesomeIcon icon={faCheckCircle as IconProp} /> Save
              </div>
              <div className={cx(styles.decline, styles.button)}>
                <FontAwesomeIcon icon={faTimes as IconProp} /> Decline
              </div>
              <div className={cx(styles.incomplete, styles.button)}>
                <FontAwesomeIcon icon={faFile as IconProp} /> Incomplete
              </div>
              <div className={cx(styles.approved, styles.button)}>
                <FontAwesomeIcon icon={faCheck as IconProp} /> Approve
              </div>
            </div>
          </div>
          <Formik
            onSubmit={(values) => alert(JSON.stringify(values))}
            validateOnChange
            initialValues={{
              FirstName: '',
              LastName: '',
              MiddleName: '',
              CellPhone: '',
              EmailAddress: '',
              SSN: '',
              DLNumber: '',
              DOB: '',
              Address: '',
              City: '',
              State: '',
              PostalCode: '',
              EmployerName: '',
              WorkPhone: '',
              Position: '',
              PositionType: '',
              HowLong: '1',
              MonthlyIncome: 1000,
              VIN: '',
              VehicleYear: 2019,
              VehicleMake: '',
              VehicleModel: '',
              VehicleMileage: 0,
              VehicleEngine: '',
              VehicleColor: '',
              PurchasePrice: 1000,
              DepositFloat: 0,
              AmountFinanced: 0,
            }}
          >
            {({ submitForm, values }) => {
              return (
                <div className={styles.formWrapper}>
                  <h1>Personal details</h1>
                  <Form className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.inputBox}>
                        <p>First name</p>
                        <Field
                          className={styles.input}
                          name="FirstName"
                          placeholder="First Name"
                        />
                      </div>
                      <div className={styles.inputBox}>
                        <p>Middle name</p>
                        <Field
                          className={styles.input}
                          name="MiddleName"
                          placeholder="Middle Name"
                        />
                      </div>
                      <div className={styles.inputBox}>
                        <p>Last name</p>
                        <Field
                          className={styles.input}
                          name="LastName"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.inputBox}>
                        <p>Phone number</p>
                        <Field
                          className={styles.input}
                          name="CellPhone"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className={styles.inputBox}>
                        <p>Email</p>
                        <Field
                          className={styles.input}
                          name="EmailAddress"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.inputBox}>
                        <p>SSN#</p>
                        <Field
                          className={styles.input}
                          name="SSN"
                          placeholder="SSN"
                        />
                      </div>
                      <div className={styles.inputBox}>
                        <p>Driver license</p>
                        <Field
                          className={styles.input}
                          name="SSN"
                          placeholder="SSN"
                        />
                      </div>
                    </div>
                    <div className={styles.formRow}>btevr</div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};
