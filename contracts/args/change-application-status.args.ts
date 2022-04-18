export interface ChangeApplicationStatusArgs {
  appid: number;
  statusid: number;
  userId: number;
  leaseApproved?: boolean;
  leaseNotes?: string;
  userApproved?: boolean;
  userNotes?: string;
}
