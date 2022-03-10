import {
  SignoutResponse,
  User,
  UserManager,
  WebStorageStateStore,
} from 'oidc-client';
import { instance } from './api-call';

class AuthService {
  private userManager: UserManager;

  constructor() {
    this.userManager =
      typeof window !== 'undefined'
        ? new UserManager({
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: 'https://adminid.happypurim.app/',
            client_id: 'admins',
            redirect_uri: `${window.location.origin}/signin-oidc`,
            response_type: 'code',
            scope: 'hpapi openid',
            post_logout_redirect_uri: `${window.location.origin}/signout-oidc`,
          })
        : null;
  }

  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  loginCallback(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }

  logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  logoutCallback(): Promise<SignoutResponse> {
    return this.userManager.signoutRedirectCallback();
  }

  async loggedIn(): Promise<boolean> {
    const res = await this.userManager.getUser();
    return Boolean(res);
  }

  async getUser(): Promise<User> {
    return this.userManager.getUser();
  }

  setTokenToHeader(token): void {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

const auth = new AuthService();

export default auth;
