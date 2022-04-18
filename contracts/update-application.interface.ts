import { ApplicationInterface } from './application.interface';

export interface UpdateApplicationInterface
  extends Partial<ApplicationInterface> {
  userid: number;
}
