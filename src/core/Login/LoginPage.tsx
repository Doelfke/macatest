import React, { FunctionComponent } from 'react';
import { WithRouterProps, withRouter } from 'react-router';

import { AuthService } from "core/Services/AuthService";


interface Props extends WithRouterProps { }

const LoginPage: FunctionComponent<Props> = (props: Props) => {
    if (window.location.hash.indexOf('#access_token') > -1) {
        const token = window.location.hash.replace('#access_token=', '').split('&expires_in')[0].split('&token_type=Bearer')[0];

        AuthService.login(token);
        return <></>;
    } else {
        window.location.href = AuthService.getLoginUrl(false);
    }


    return <></>;
};




export default withRouter(LoginPage);