import { NextRouter } from 'next/dist/client/router';

export interface AddUserArgsInterface {
  payload: AddUserPayloadInterface;
  router: NextRouter;
}

export interface AddUserPayloadInterface {
  CellPhone: string;
  DOB: string;
  EmailAddress: string;
  FirstName: string;
  Ip: string;
  LastName: string;
  MiddleName: string;
  MonthlyExpenses: number;
  MonthlyIncome: number;
  SSN: string;
}
