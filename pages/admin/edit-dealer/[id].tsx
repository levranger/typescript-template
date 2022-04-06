import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isDefined } from '@rnw-community/shared';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import styles from '../../styles/dealership.module.css';
import {
  AddDealerForm,
  AdminSidebar,
  EditDealerForm,
} from '../../../components';
import { withAuth } from '../../../hocs';
import {
  adminDashboardSelector,
  dealerItemSelector,
  loadDealer,
  loadStates,
  stateSelector,
  updateDealers,
} from '../../../features/adminDashboardSlice';
import { userSelector } from '../../../features/authSlice';
import { DealerInterface } from '../../../contracts';
import { initialDealerFormValues } from '../add-dealer';

export type EditType = 'EDIT' | 'VIEW';

const EditDealer: FC = () => {
  const [mode, setMode] = useState<EditType>('VIEW');

  const router = useRouter();

  const { pending } = useSelector(adminDashboardSelector);
  const user = useSelector(userSelector);
  const dealerItem = useSelector(dealerItemSelector);
  const states = useSelector(stateSelector);

  const dispatch = useDispatch();

  const { id } = router.query;

  useEffect(() => void dispatch(loadStates()), []);
  useEffect(() => {
    if (isDefined(id)) {
      dispatch(loadDealer({ userid: Number(user?.ID), dealerid: Number(id) }));
    }
  }, [id]);
  const handleChangeMode = (editMode: EditType) => () => setMode(editMode);
  const handleSubmit = (values: Partial<DealerInterface>): void => {
    dispatch(
      updateDealers({
        payload: { ...values, userid: Number(user?.ID), dealerid: Number(id) },
        router,
      })
    );
    setMode('VIEW');
  };
  const handleBack = (): void => router.back();

  const editValues = _.pick(dealerItem, Object.keys(initialDealerFormValues));

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      {mode === 'VIEW' && (
        <EditDealerForm
          pending={pending}
          dealerData={dealerItem}
          onBack={handleBack}
          onEdit={handleChangeMode('EDIT')}
        />
      )}
      {mode === 'EDIT' && (
        <AddDealerForm
          pending={pending}
          onSubmit={handleSubmit}
          states={states}
          onBack={handleBack}
          initialValues={editValues}
        />
      )}
    </div>
  );
};

export default withAuth(EditDealer);
