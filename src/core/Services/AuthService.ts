import { decode } from 'jsonwebtoken';

import { NavigationService } from 'core/Services/NavigationService';
import { ConfigService } from 'core/Services/ConfigService';


const TOKEN_NAME = 'auth-token';

const getLoginUrl = (showRegisterScreen: boolean) => {
    const clientId = ConfigService.getString('AUTH_0_CLIENT_ID');
    const domain = ConfigService.getString('AUTH_0_DOMAIN');
    const audience = ConfigService.getString('AUTH_0_AUDIENCE');


    const screen = showRegisterScreen ? '&screen_hint=signup' : '';

    return `https://${domain}/authorize?response_type=token&audience=${audience}&client_id=${clientId}${screen}&redirect_uri=${window.location.origin}/login`;
};

const login = (token: string) => {
    localStorage.setItem(TOKEN_NAME, token);
    NavigationService.goTo('s');
};

const logOut = () => {
    localStorage.removeItem(TOKEN_NAME);
    const clientId = ConfigService.getString('AUTH_0_CLIENT_ID');
    const domain = ConfigService.getString('AUTH_0_DOMAIN');


    const logoutURL = `https://${domain}/v2/logout?returnTo=${window.location.origin}/login&client_id=${clientId}`;
    NavigationService.goTo(logoutURL, true);
};

const isTokenExpired = (token: string) => {
    token = token || localStorage.getItem(TOKEN_NAME) as string;
    const decoded = token && decode(token);
    return !(decoded && (decoded as { exp: number; }).exp > Date.now() / 1000);
};

const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (isTokenExpired(token)) {
        return false;
    }
    return true;
};

const getToken = () => {
    return localStorage.getItem(TOKEN_NAME);
};


const getAuthEmail = () => {
    const token = getToken();
    const decoded = decode(token!) as any;
    return decoded!.email;
};

export const AuthService = {
    logOut,
    login,
    isTokenExpired,
    isAuthenticated,
    getToken,
    getLoginUrl,
    getAuthEmail
};

