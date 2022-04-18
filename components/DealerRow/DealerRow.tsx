import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './DealerRow.module.css';
import { ApplicationInterface } from '../../contracts';

interface Props extends Partial<ApplicationInterface> {
  onEditClick: (id: string) => () => void;
}

export const DealerRow: FC<Props> = ({
  FirstName,
  LastName,
  ApplicationID,
  CellPhone,
  VehicleModel,
  VehicleMake,
  VehicleYear,
  ID,
  PurchasePrice,
  VIN,
  Status,
  onEditClick,
  isShown,
}) => {
  if (!isShown) return null;
  return (
    <tr className={styles.tableRow}>
      <td>
        {FirstName}
        {LastName}
      </td>
      <td>{ApplicationID}</td>
      <td>{CellPhone}</td>
      <td>
        {VehicleMake}
        {VehicleModel}
        {VehicleYear}
      </td>
      <td>{PurchasePrice}</td>
      <td>{VIN}</td>
      <td>{Status}</td>
      <td
        className={styles.rowButton}
        onClick={onEditClick(ApplicationID.toString())}
      >
        <FontAwesomeIcon icon={faArrowRight as IconProp} color="darkgrey" />
      </td>
    </tr>
  );
};
