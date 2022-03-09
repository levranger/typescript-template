import {instance} from "./api-call";
import {UserManager, WebStorageStateStore} from "oidc-client";


class AuthService {
        private userManager: UserManager;
        constructor() {
            this.userManager = typeof window !== 'undefined' ? new UserManager({
                userStore:  new WebStorageStateStore({store: window?.localStorage}),
                authority: "https://adminid.happypurim.app/",
                client_id: "admins",
                redirect_uri: window.location.origin + "/signin-oidc",
                response_type: "code",
                scope: "hpapi openid",
                post_logout_redirect_uri: window.location.origin + "/signout-oidc",
            }) : null

            console.log(this.userManager)
        }

        login() {
            return this.userManager.signinRedirect();
        }
        loginCallback() {
            return this.userManager.signinRedirectCallback();
        }
        logout() {
            return this.userManager.signoutRedirect();
        }
        logoutCallback() {
            return this.userManager.signoutRedirectCallback();
        }

        async loggedIn() {
            let res = await this.userManager.getUser();
            return !!res;
        }
        async getUser() {
            return await this.userManager.getUser();
        }

        setTokenToHeader(token) {
            instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }


    const auth = new AuthService()

export default auth;
