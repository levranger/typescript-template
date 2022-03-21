import { FormikErrors, FormikValues } from 'formik';
import { isDefined } from '@rnw-community/shared';

export const hasErrors = (
  isTouched: boolean,
  hasError: keyof FormikErrors<FormikValues>
): boolean => isDefined(isTouched && hasError);
