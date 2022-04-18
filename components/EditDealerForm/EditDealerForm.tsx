import React, { FC } from 'react';
import { OnEventFn } from '@rnw-community/shared';
import { Oval } from 'react-loader-spinner';
import styles from './EditDealerForm.module.css';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { DealerInterface } from '../../contracts';
import { DealerFormTitleBar } from '../DealerFormTitleBar/DealerFormTitleBar';
import { EditType } from '../../pages/admin/edit-dealer/[id]';

interface Props {
  dealerData: DealerInterface;
  onBack: OnEventFn;
  onEdit: OnEventFn;
  pending: boolean;
}

export const EditDealerForm: FC<Props> = ({
  pending,
  dealerData,
  onBack,
  onEdit,
}) => {
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.contents}>
        <DealerFormTitleBar onBack={onBack} />
        <div className={styles.infoContainer}>
          {!dealerData || pending ? (
            <Oval
              secondaryColor="black"
              wrapperClass={styles.loader}
              width={80}
              height={80}
              color="black"
            />
          ) : (
            <>
              <div className={styles.infoBar}>
                <div>
                  <span className={styles.infoKey}>Name</span>
                  <p className={styles.infoValue}>{dealerData.Name}</p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.addressContainer}>
                  <span className={styles.infoKey}>Address</span>
                  <p className={styles.infoValue}>{dealerData.Address}</p>
                </div>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>City</span>
                  <p className={styles.infoValue}>{dealerData.City}</p>
                </div>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>State</span>
                  <p className={styles.infoValue}>{dealerData.State}</p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>License</span>
                  <p className={styles.infoValue}>{dealerData.License}</p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.addressContainer}>
                  <span className={styles.infoKey}>Phone number</span>
                  <p className={styles.infoValue}>{dealerData.WorkPhone}</p>
                </div>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>EXT</span>
                  <p className={styles.infoValue}>{dealerData.EXT}</p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>Website</span>
                  <p className={styles.infoValue}>{dealerData.Website}</p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>Email</span>
                  <p className={styles.infoValue}>{dealerData.EmailAddress}</p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.infoBox}>
                  <span className={styles.infoKey}>Contact position</span>
                  <p className={styles.infoValue}>
                    {dealerData.ContactPosition}
                  </p>
                </div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.editButton} onClick={onEdit}>
                  Edit
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
