import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import { StyleType } from '@rnw-community/shared';
import InputMask from 'react-input-mask';

interface GenericPropsInterface {
  name: string;
  className: StyleType;
  placeholder?: string;
}

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
