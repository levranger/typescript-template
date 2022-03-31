import { NextRouter } from 'next/dist/client/router';
import { DealerInterface } from '../dealer.interface';

export interface CreateDealerArgsInterface {
  payload: Partial<DealerInterface> & {
    userid: number;
    dealerid: number;
  };
  router: NextRouter;
}
