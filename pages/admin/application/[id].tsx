import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isNotEmptyString, isString } from '@rnw-community/shared';
import { Oval } from 'react-loader-spinner';
import styles from '../../styles/dealership.module.css';
import { AdminSidebar, EditDealerContent } from '../../../components';
import { withAuth } from '../../../hocs';
import {
  adminDashboardSelector,
  loadApplication,
  loadContractTypes,
} from '../../../features/adminDashboardSlice';

const EditDealerPage: FC = () => {
  const router = useRouter();

  const { applicationItem, pending, contractsTypes } = useSelector(
    adminDashboardSelector
  );

  const dispatch = useDispatch();

  const { id } = router.query;

  useEffect(() => {
    if (isString(id)) {
      dispatch(loadContractTypes());
      dispatch(loadApplication(id));
    }
  }, [id]);

  const handleBackPress = (): void => router.back();

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <EditDealerContent
        contractTypes={contractsTypes}
        pending={pending}
        application={applicationItem}
        onBackPress={handleBackPress}
      />
    </div>
  );
};

export default withAuth(EditDealerPage);
