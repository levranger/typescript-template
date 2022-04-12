import { FormikErrors, FormikValues } from 'formik';
import { isDefined } from '@rnw-community/shared';

export const hasErrors = (
  isTouched: boolean | any,
  hasError: keyof FormikErrors<FormikValues> | any
): boolean => isDefined(isTouched && hasError);
