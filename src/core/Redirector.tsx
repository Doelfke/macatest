import React, { FunctionComponent, PropsWithChildren, useEffect } from 'react';

import ApiService from 'api/ApiService';
import { NavigationService } from 'core/Services/NavigationService';


interface Props extends PropsWithChildren<{}> { }

const Redirector: FunctionComponent<Props> = (props: Props) => {
    const profile = ApiService.userApi.useGetSelf();

    useEffect(() => {
        if (profile.errorCode === 404) {
            NavigationService.goTo('/user/create-profile');
        }
    });

    if (profile.isLoading) {
        return <></>;
    }

    return <>{props.children}</>;
};


export default Redirector;